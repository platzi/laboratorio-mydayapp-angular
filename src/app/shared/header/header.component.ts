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

  ngOnInit(): void {
  }

  addTodoItem(){
    console.log(uniqid())
    let newTodoItem: todoItem = {
      id : uniqid(),
      title : 'Test',
      completed : false
    }

    this.todoService.addTodoItem(newTodoItem)
  }

}
