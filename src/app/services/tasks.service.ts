import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Task } from '../components/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private _tasks : Task[] = []; 

  constructor() { 
    this._tasks = this.loadStg();
    this.updatePendingTask();
  }

  private _pending = new BehaviorSubject<Task[]>(this._tasks.filter(item => item.completed == false));
  pendingTask$ = this._pending.asObservable()

  addTask ( task: string ){
    const toDo: Task = {
      completed: false,
      id: (this._tasks.length + 1).toString(),
      title: task
    }
    this._tasks.push(toDo);
    this.saveInStg();
    this.updatePendingTask();
  }

  getTask(){
    return this._tasks;
  }

  saveInStg(){
    localStorage.setItem('mydayapp-angular', JSON.stringify(this._tasks))
  }

  loadStg(){
    return JSON.parse(
      localStorage.getItem('mydayapp-angular') || '[]'
    )
  }

  updateTask(task: Task){
    const index = this._tasks.indexOf(task);
    this._tasks[index] = task;
    this.saveInStg();
    this.updatePendingTask();
  }

  deleteTask(task: Task){
    const index = this._tasks.indexOf(task);
    this._tasks.splice(index,1);
    this.saveInStg();
    this.updatePendingTask();
  }

  updatePendingTask(){
    this._pending.next(this._tasks.filter(item => item.completed == false))
  }

}
