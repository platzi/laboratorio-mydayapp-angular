import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../components/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private _tasks: Task[] = [];

  constructor() {
    this._tasks = this.loadStg();
    this.updatePendingTask();
  }

  private _allTasks = new BehaviorSubject<Task[]>(this._tasks)
  allTask$ = this._allTasks.asObservable();

  addTask(task: string) {
    const toDo: Task = {
      completed: false,
      id: (this._tasks.length + 1).toString(),
      title: task
    }
    this._tasks.push(toDo);
    this.saveInStg();
    this.updatePendingTask();
  }

  getTask() {
    return this._tasks;
  }

  saveInStg() {
    localStorage.setItem('mydayapp-angular', JSON.stringify(this._tasks));
  }

  loadStg() {
    return JSON.parse(
      localStorage.getItem('mydayapp-angular') || '[]'
    )
  }

  updateTask(task: Task) {
    const index = this._tasks.indexOf(task);
    this._tasks[index] = task;
    this.saveInStg();
    this.updatePendingTask();
  }

  deleteTask(task: Task) {
    const index = this._tasks.indexOf(task);
    this._tasks.splice(index, 1);
    this.saveInStg();
    this.updatePendingTask();
  }

  updatePendingTask() {
    this._allTasks.next(this._tasks);
  }

  clearCompleted() {
    this._tasks = this.getPendingTask();
    this.saveInStg();
    return this._tasks
  }

  getPendingTask(){
    return this._tasks.filter(task => task.completed == false)
  }

  getCompletedTask(){
    return this._tasks.filter(task => task.completed == true)
  }
  
}
