import { Injectable } from '@angular/core';
import { Task } from '../components/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { 
    this._tasks = this.loadStg();
  }

  private _tasks : Task[] = []; 

  addTask ( task: string ){
    const toDo: Task = {
      completed: false,
      id: (this._tasks.length + 1).toString(),
      title: task
    }
    this._tasks.unshift(toDo);
    this.saveInStg();
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
  }

  deleteTask(task: Task){
    const index = this._tasks.indexOf(task);
    this._tasks.splice(index,1);
    this.saveInStg();
  }

}
