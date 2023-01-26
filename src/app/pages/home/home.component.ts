import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos-service.service';
import { Todo } from './todo.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  todoInput: string = '';
  todos$: Observable<Todo[]> = new Observable();
  todosFilter: 'all' | 'pending' | 'completed' = 'all';

  constructor(
    private _todosService: TodosService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.url.subscribe(url => this.#setTodosFilterTypeFromPath(url[0].path))
    this.#getTodos();
  }

  #getTodos(): void {
    this._todosService.loadTodosFromLocalStorage();
    this.todos$ = this._todosService.getTodos(this.todosFilter);
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

  pendingTodos(todos: Todo[]): number {
    return todos.filter((t) => t.completed === false).length;
  }

  completedTodos(todos: Todo[]): number {
    return todos.filter((t) => t.completed === true).length;
  }

  addSToLeftItemsMessage(todos: Todo[]): string {
    const nPending = todos.filter((t) => t.completed === false).length;
    if (nPending === 1) return '';
    return 's';
  }

  clearCompletedTodos(): void {
    this._todosService.clearCompletedTodos();
    this.todos$ = this._todosService.getTodos('all');
  }

  #setTodosFilterTypeFromPath(path: string): void {
    if (path === '') {
      this.todosFilter = 'all';
      return;
    }
    this.todosFilter = path as 'pending' | 'completed';
  }
}
