import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { v4 as uuidv4 } from 'uuid';
import { SharedService } from './shared.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private sharedService: SharedService,
    private storageService: StorageService
  ) { 
    this.updateSharedData(storageService.readStorage());
  }

  addTask(title: string, todos: Array<Todo> ): void {
    const id: string = uuidv4();

    if (title != '') {
      let todo: Todo = {
        id,
        title: title.trim(),
        completed: false
      }

      todos.push(todo);

      this.updateSharedData(todos)
      this.storageService.save(todos);
    }
  }

  completedTask(todo: Todo) {
    todo.completed = !todo.completed;    
    
    this.sharedService.getTodosData().subscribe(todos => {
      this.storageService.save(todos);
    });
  }

  updateSharedData(todos: Array<Todo>) {
    this.sharedService.setTodosData(todos);
  }

  editTaskTitle() {
    this.sharedService.getTodosData().subscribe(todos => {
      this.storageService.save(todos);
    });
  }

  clearCompleted() {
    this.sharedService.getTodosData().subscribe(todos => {
      const filteredValue = todos.filter(todo => !todo.completed);
      this.sharedService.setTodosData(filteredValue);
       this.storageService.save(todos);
    });
  }
}
