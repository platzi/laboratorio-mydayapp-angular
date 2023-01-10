import { Injectable } from '@angular/core';
import { todoItem } from '../models/todoItem.interface';
import { BehaviorSubject }  from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private itemsSubject = new BehaviorSubject<todoItem[]>([]);
  public todoItems$ = this.itemsSubject.asObservable();
  private todoItems: Array<todoItem> = []
  constructor() {
    const localStorageTodoItems = localStorage.getItem("mydayapp-angular")

    if(localStorageTodoItems){
    this.todoItems =  JSON.parse(localStorageTodoItems)
    this.itemsSubject.next(this.todoItems);
    }
    
  
   }


  addTodoItem(newTodoItem:todoItem){
    this.todoItems = [ ...this.todoItems, {...newTodoItem}];
    localStorage.setItem("mydayapp-angular",JSON.stringify(this.todoItems))
    this.itemsSubject.next(this.todoItems);
  }

  changeTodo(todoitem:todoItem){
    let findTodoItem = this.todoItems.find(f=>f.id ===todoitem.id) 
    findTodoItem ={
      ...todoitem
    };
    localStorage.setItem("mydayapp-angular",JSON.stringify(this.todoItems))
    this.itemsSubject.next(this.todoItems);
  }

  removeCompleteTodo(){
    this.todoItems = [ ...this.todoItems.filter(f=>f.completed!=true) ]
    localStorage.setItem("mydayapp-angular",JSON.stringify(this.todoItems))
    this.itemsSubject.next(this.todoItems);
  }

  removeTodo(removeTodoItem:todoItem){
    this.todoItems = [ ...this.todoItems.filter(f=>f.id!=removeTodoItem.id) ]
    localStorage.setItem("mydayapp-angular",JSON.stringify(this.todoItems))
    this.itemsSubject.next(this.todoItems);
  }
}
