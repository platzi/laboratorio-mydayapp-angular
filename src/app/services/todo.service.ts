import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '@app/models/Todo.model'
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoListSource = new BehaviorSubject<ITodo[]>([]);
  key="mydayapp-angular"
  constructor() {
    const storedList = localStorage.getItem(this.key);
    if (storedList) {
      this.todoListSource.next(JSON.parse(storedList));
    }
  }

  todoList$ = this.todoListSource.asObservable();

  create(title: string) {
    const currentList = this.todoListSource.getValue();
    const todo: ITodo = {
      title,
      completed: false
    };
    currentList.push(todo);
    this.todoListSource.next(currentList);
    localStorage.setItem(this.key,JSON.stringify(currentList))
  }

  delete(id: number) {
    const currentList = this.todoListSource.getValue();
    currentList.splice(id, 1);
    this.todoListSource.next(currentList);
    localStorage.setItem(this.key,JSON.stringify(currentList))
  }

}
