
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { StorageService } from './storage.service';
import { StatusTask } from '../enums/statusTask.enum';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private storageService: StorageService
  ) { 
    
  }

  createTask(title: string): void {

    let newTask: Task = {
      id: new Date().getTime().toString(),
      title,
      completed: false
    };

    this.storageService.saveTaskInStorage(newTask);
  }

  getTaks(): Task[] {
    return this.storageService.getTasksFromStorage;
  }

  getTthereIsTasks(): boolean {
    return this.storageService.thereIsTask;
  }

  changeStatus(task: Task) {
    this.storageService.updateTask(task);
  }

  deleteTask(id: string) {
    this.storageService.deleteTask(id);
  }

  deleteCompletedTaks() {
    this.storageService.deleteCompletedTaks();
  }

  filterTasks(filter: StatusTask): Task[] {
    return this.storageService.filterTask(filter);
  }

  amountOfPendingTasks(): number {
    return this.storageService.amountOfPendingTasks;
  }

  amountOfCompletedTasks(): number {
    return this.storageService.amountOfCompletedTasks;
  }

}
