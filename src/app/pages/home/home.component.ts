import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos-service.service';
import { Todo } from './todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  todoInput: string = "";
  todos$: Observable<Todo[]> = new Observable();
  constructor(private _todosService: TodosService) { }

  ngOnInit(): void {
    this.#getTodos();
  }

  #getTodos(): void {
    this._todosService.loadTodosFromLocalStorage();
    this.todos$ = this._todosService.getTodos('all');
  }

  addNewTodo(event: KeyboardEvent): void {
    const cleanInput = this.todoInput.trim();
    if (event.key !== 'Enter' || cleanInput === '') return;

    this._todosService.addNewTodo(cleanInput);
    this.todoInput = '';
  }

  updateTodoCompletedStatus(todoId: string): void {
    this._todosService.toggleTodoCompletedStatus(todoId);
  }

  updateTodoTitle(todoId: string, newTitle: string): void {
    this._todosService.updateTodoTitle(todoId, newTitle);
  }
}
