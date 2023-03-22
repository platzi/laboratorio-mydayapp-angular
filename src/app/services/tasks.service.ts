import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, Subject } from 'rxjs';
import { Tasks } from '../shared/model/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _tasks: BehaviorSubject<Tasks[]> = new BehaviorSubject<Tasks[]>([]);
  private _tasksPending: BehaviorSubject<Tasks[]> = new BehaviorSubject<Tasks[]>([]);
  private _tasksCompleted: BehaviorSubject<Tasks[]> = new BehaviorSubject<Tasks[]>([]);

  constructor() {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('mydayapp-angular') || '[]');
    this._tasks.next(tasksFromLocalStorage);
  }

  getTasks(): Observable<Tasks[]> {
    return this._tasks.pipe(filter(datos => datos !== null));
  }

  getPendingTasks(): Observable<Tasks[]> {
    const tasks = this._tasks.getValue();
    const pendingTasks = tasks?.filter((task) => task.completed !== true);
    this._tasksPending.next(pendingTasks);
    return this._tasksPending.pipe(filter(datos => datos !== null));
  }

  getCompletedTasks(): Observable<Tasks[]> {
    const tasks = this._tasks.getValue();
    const completedTasks = tasks?.filter((task) => task.completed === true);
    this._tasksCompleted.next(completedTasks);
    return this._tasksCompleted.pipe(filter(datos => datos !== null));
  }

  addTask(title: string) {
    const tasks = this._tasks.getValue();
    const newTask = { id: tasks.length + 1, title, completed: false, edit: false };
    tasks.push(newTask);
    localStorage.setItem('mydayapp-angular', JSON.stringify(tasks));
    this._tasks.next(tasks);
  }

  editTask(id: number, title: string) {
    const tasks = this._tasks.getValue();
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.title = title;
    }
    localStorage.setItem('mydayapp-angular', JSON.stringify(tasks));
    this._tasks.next(tasks);
  }

  deleteTask(id: number) {
    const tasks = this._tasks.getValue();
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
    localStorage.setItem('mydayapp-angular', JSON.stringify(tasks));
    this._tasks.next(tasks);
  }

  editMode(id: number, editTask: boolean){
    const tasks = this._tasks.getValue();
    const task = tasks.find(t => t.id === id);
    if(task){
      task.edit = editTask;
    }
    localStorage.setItem('mydayapp-angular', JSON.stringify(tasks));
    this._tasks.next(tasks);
  }

  completedTask(id: number, completed: boolean){
    const tasks = this._tasks.getValue();
    const task = tasks.find(t => t.id === id);
    if(task){
      task.completed = completed;
    }
    localStorage.setItem('mydayapp-angular', JSON.stringify(tasks));
    this._tasks.next(tasks);
  }

  deleteAllTaskCompleted(){
    const tasks = this._tasks.getValue();
    const deleteTasks = tasks?.filter((task) => task.completed !== true);
    localStorage.setItem('mydayapp-angular', JSON.stringify(deleteTasks));
    this._tasks.next(deleteTasks);
  }

}
