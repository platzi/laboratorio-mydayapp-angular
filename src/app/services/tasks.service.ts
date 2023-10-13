import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private storageName = 'mydayapp-angular';
  private storageS = new BehaviorSubject<Task[]>([]);
  private storage!: Task[];
  private id!: number;

  public storage$ = this.storageS.asObservable();

  constructor(){
    const storage = localStorage.getItem(this.storageName);
    (storage) ? this.storage = JSON.parse(storage) : this.storage = [];
    this.storageS.next(this.storage);

    const currentId = localStorage.getItem('ids');
    (currentId) ? this.id = parseInt(currentId) : this.id = 0;
  }

  createTask(title: string){
    const task = this.newTask(title);
    this.storage.push(task);
    this.storageS.next(this.storage);
    localStorage.setItem(this.storageName, JSON.stringify(this.storage));
  }

  completeTask(id: string, value: boolean){
    const [_, taskId] = id.split('-');
    const index = this.storage.findIndex(task => task.id == taskId);
    const task: Task = { ...this.storage[index], completed: value };
    this.storage.splice(index, 1, task);
    this.storageS.next(this.storage);
    localStorage.setItem(this.storageName, JSON.stringify(this.storage));
  }
  editTask(id: string, title: Task['title']){
    const idArr = this.storage.findIndex(task => task.id == id);
    const task: Task = { ...this.storage[idArr], title: title };
    this.storage.splice(idArr, 1, task);
    this.storageS.next(this.storage);
    localStorage.setItem(this.storageName, JSON.stringify(this.storage));
  }

  deleteTask(taskId: number){
    const index = this.storage.findIndex(element => element.id == taskId);
    this.storage.splice(index, 1);
    this.storageS.next(this.storage);
    localStorage.setItem(this.storageName, JSON.stringify(this.storage));
  }

  deleteCompletedTasks(){
    let completedTask = this.storage.filter(element => !element.completed);
    this.storageS.next(completedTask);
    localStorage.setItem(this.storageName, JSON.stringify(completedTask));
  }

  private newTask(title: string): Task{
    this.id++;
    localStorage.setItem('ids', this.id.toString());
    return { title: title,  id: this.id, completed: false };
  }

  getStorage(): Task[]{
    return this.storage;
  }
}
