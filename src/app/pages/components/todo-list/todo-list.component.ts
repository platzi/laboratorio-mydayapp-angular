import { Component, OnInit } from '@angular/core';
import { TodoService } from '@app/services/todo.service'
import { ITodo } from '@app/models/Todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoEditing = {
    id: 0,
    editing: false
  };
  constructor (private todoService: TodoService) { }
  todoList$ = this.todoService.todoList$;
  todoList: ITodo[] = []
  ngOnInit(): void {
    this.todoList$.subscribe(value => {
      this.todoList = value
    })
  }
  handleValueChange(value: any) {
    this.todoEditing = value;
    this.todoService.todoList$.subscribe((value) => {
      if (this.todoEditing.editing) {
        const todoItem = value.find((v) => v.id == this.todoEditing.id)
        let todo: ITodo[] = []
        if (todoItem) {
          todo = [todoItem]
          this.todoList = todo
        }
      }else{
        this.todoList = value
      }
    })
  }

}
