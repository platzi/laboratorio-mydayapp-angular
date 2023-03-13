import { Injectable } from '@angular/core';
import { Tasks } from '../shared/model/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksList: Tasks[] = [
    { id: 1, title: 'Comprar leche', completed: false },
    { id: 2, title: 'Pasear al perro', completed: false },
    { id: 3, title: 'Hacer la cama', completed: false },
  ];

  addTask(title: string) {
    const newTask = { id: this.tasksList.length + 1, title, completed: false };
    this.tasksList.push(newTask);
  }

  editTask(id: number, title: string) {
    const task = this.tasksList.find(t => t.id === id);
    if (task) {
      task.title = title;
    }
  }

  deleteTask(id: number) {
    const index = this.tasksList.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasksList.splice(index, 1);
    }
  }

  constructor() { }


}
