import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private taskList : Task[] = [];
  private tasksList = new BehaviorSubject<Task[]>([]);
  public tasksList$: Observable<Task[]> = this.tasksList.asObservable();

  constructor(
    private storageService: StorageService
  ) {
  }

  isEmpty(): boolean{
    return this.taskList.length == 0;
  }

  initTasks(){
    if(localStorage.getItem('mydayapp-angular')){
      this.taskList = this.storageService.readStorage();
      this.saveTasks();
    }
  }

  createTask(title: string){
    const newTask:Task = {
      id: new Date().getTime(),
      title,
      completed: false
    }
    this.taskList = [...this.taskList, newTask];
    this.saveTasks();
  }

  deleteTask(task:Task){
    this.taskList = this.taskList.filter(op => op.id != task.id);

    this.saveTasks();
  }

  updateTask(task: Task){
    const index = this.taskList.findIndex(op => op.id == task.id);
    this.taskList[index]= task;
    this.saveTasks();
  }

  getTaskPedingLength(): number{
    return this.taskList.filter(op => !op.completed).length;
  }

  getTaskCompletedLength(): number{
    return this.taskList.filter(op => op.completed).length;
  }

  getTaskPeding(): Task[]{
    return this.taskList.filter(op => !op.completed);
  }

  getTaskCompleted(): Task[]{
    return this.taskList.filter(op => op.completed);
  }

  clearCompletedTasks(){
    this.taskList = this.taskList.filter(op => !op.completed);
    this.saveTasks();
  }

  private saveTasks(){
    this.tasksList.next(this.taskList);
    this.storageService.save(this.taskList);
  }

  toggle(id: Task['id']): void {
    this.taskList = this.taskList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.saveTasks();
  }

}
