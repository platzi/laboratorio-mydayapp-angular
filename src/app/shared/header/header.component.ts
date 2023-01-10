import { Component, OnInit, ɵisObservable } from '@angular/core';
import { todoItem } from 'src/app/models/todoItem.interface';
import { TodoService } from 'src/app/services/todo.service';
import * as uniqid from 'uniqid';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private todoService:TodoService) { }

  public itemTodo:string = "";
  ngOnInit(): void {
    this.itemTodo = "";
  }

  addTodoItem(){
    this.itemTodo = this.itemTodo.trim()
    
    if(this.itemTodo.length ===0) return 
    
    let newTodoItem: todoItem = {
      id: uniqid(),
      title: this.itemTodo,
      completed: false,
    };
    this.itemTodo = "";
    this.todoService.addTodoItem(newTodoItem)
  }

}
