import { Component, OnInit, Input ,ElementRef } from '@angular/core';
import { todoItem } from 'src/app/models/todoItem.interface';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() item!: todoItem;
  constructor(private todoService: TodoService) {}
  public  edit = false;
  ngOnInit(): void {
    this.edit = false;
  }

  changeTodo(IsCheckCompleted:boolean) {
    this.edit = false;
    this.item.title = this.item.title.trim()
    
    if(this.item.title.length ===0) return 
    if(IsCheckCompleted)
    this.item.completed = !this.item.completed;

    this.todoService.changeTodo(this.item);
  }

  editStatus(status:boolean, input:HTMLInputElement){
    this.edit = status;
  }

  removeTodo(){
    this.todoService.removeTodo(this.item);
  }
}
