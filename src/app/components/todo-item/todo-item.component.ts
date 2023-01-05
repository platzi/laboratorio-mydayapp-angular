import { Component, OnInit, Input } from '@angular/core';
import { todoItem } from 'src/app/models/todoItem.interface';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input()item!:todoItem
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }
  
  changeTodo(){
    this.item.completed = !this.item.completed
    this.todoService.changeTodo(this.item)
  }

}
