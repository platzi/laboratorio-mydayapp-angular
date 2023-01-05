import { Injectable } from '@angular/core';
import { todoItem } from '../models/todoItem.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoItems: Array<todoItem> = []
  constructor() {
    const localStorageTodoItems = localStorage.getItem("mydayapp-angular")
    
  
   }


  addTodoItem(todoitem:todoItem){
    this.todoItems.push({...todoitem});
    localStorage.setItem("mydayapp-angular",JSON.stringify(this.todoItems))
  }

  changeTodo(todoitem:todoItem){
    let findTodoItem = this.todoItems.find(f=>f.id ===todoitem.id) 
    findTodoItem ={
      ...todoitem
    };
    localStorage.setItem("mydayapp-angular",JSON.stringify(this.todoItems))
  }

  removeCompleteTodo(){
    this.todoItems = [ ...this.todoItems.filter(f=>f.completed!=true) ]
    localStorage.setItem("mydayapp-angular",JSON.stringify(this.todoItems))
  }
}
