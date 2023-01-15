import {Injectable} from '@angular/core';
import {TodoModel} from '../models/todo.model';
import {BehaviorSubject, map} from 'rxjs';
import {FilterTodoEnum} from '../enum/filter-todo.enum';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  listTodos: TodoModel[] = [];
  private todos$ = new BehaviorSubject<TodoModel[]>(this.listTodos);

  private filter = FilterTodoEnum.ALL;
  private filter$ = new BehaviorSubject<FilterTodoEnum>(this.filter);

  constructor(private storage: StorageService) {
  }

  getTodos() {
    return this.todos$.asObservable();
  }

  getTodoByFilter() {
    console.log('getByFilter', this.filter);
    return this.getTodos().pipe(
      map((todos) => {
        if (this.filter === FilterTodoEnum.PENDING) {
          return todos.filter((todo) => !todo.completed);
        }
        if (this.filter === FilterTodoEnum.COMPLETED) {
          return todos.filter((todo) => todo.completed);
        }
        return todos;
      })
    );
  }

  getTodosPending() {
    return this.getTodos().pipe(map(todos => todos.filter(x => !x.completed)));
  }

  getTodosCompleted() {
    return this.getTodos().pipe(map(todos => todos.filter(x => x.completed)));
  }

  add(value: string) {
    this.listTodos.push({ id: Date.now().toString(), title: value, completed: false});
    this.save();
  }

  update(id: string, title: string) {
    this.listTodos.forEach(x => {
      if (x.id === id) {
        x.title = title;
      }
    });
    this.save();
  }

  remove(id: string) {
    this.listTodos = this.listTodos.filter(todo => todo.id != id);
    this.save();
  }

  toggle(id: TodoModel['id']) {
    this.listTodos = this.listTodos.map( todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
    this.save();
  }

  clearCompleted() {
    this.listTodos = this.listTodos.filter(x => !x.completed);
    this.save();
  }

  private save() {
    this.todos$.next(this.listTodos);
    this.storage.saveItem(this.listTodos);
  }

  changeFilter(filter: FilterTodoEnum) {
    console.log('changeFilter', filter);
    this.filter = filter;
    this.filter$.next(filter);
    this.todos$.next(this.listTodos);
  }

  getFilter() {
    return this.filter$.asObservable();
  }

  readStorage() {
    this.listTodos = this.storage.getData();
    this.save();
  }
}
