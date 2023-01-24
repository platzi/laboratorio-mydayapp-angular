import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../pages/home/todo.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  #localStorageKey = 'mydayapp-angular';
  #todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject([] as Todo[]);

  constructor(private _localStorageService: LocalStorageService) { }

  loadTodosFromLocalStorage() {
    const todosStorage = this._localStorageService.getItems<Todo[]>(this.#localStorageKey);
    this.#todosSubject.next(todosStorage);
  }

  addNewTodo(todo: Todo) {
    const todosList = this.#todosSubject.value;
    todo.id = this.#generateTodoId();
    todo.completed = false;
    todosList.push(todo);

    this.#todosSubject.next(todosList);
    this._localStorageService.setItems(this.#localStorageKey, todosList);
  }

  getTodos(filter: 'all' | 'completed' | 'pending') {
    return this.#todosSubject.pipe(
      map(todos => {
        if (filter !== 'all') {
          return todos.filter(todo => todo.completed === ('completed' === filter))
        }
        return todos;
      })
    )
  }

  updateTodoTitle(todoId: string, newTitle: string) {
    const todosList = this.#todosSubject.value;
    const todoIndex = todosList.findIndex(t => t.id === todoId);
    todosList[todoIndex].title = newTitle;
    this.#updateTodosStorage(todosList);
  }


  toggleTodoCompletedStatus(todoId: string) {
    const todosList = this.#todosSubject.value;
    const todoIndex = todosList.findIndex(t => t.id === todoId);
    todosList[todoIndex].completed = !todosList[todoIndex].completed;
    this.#updateTodosStorage(todosList);
  }

  removeTodo(todoId: string) {
    const todosList = this.#todosSubject.value;
    const todoIndex = todosList.findIndex(t => t.id === todoId);
    todosList.splice(todoIndex, 1);
    this.#updateTodosStorage(todosList);
  }

  #generateTodoId(): string {
    const idLength = 10;
    let newId = '';
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for(let i = 0; i < idLength; i++) {
      const characterPosition = Math.floor(Math.random() * charactersLength);
      newId += characters.charAt(characterPosition);
    }

    return newId;
  }

  #updateTodosStorage(todosList: Todo[]) {
    this._localStorageService.setItems(this.#localStorageKey, todosList);
    this.#todosSubject.next(todosList);
  }
}
