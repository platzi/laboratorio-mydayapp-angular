import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {Todo} from "../../models/todo.model";
import {FormControl} from "@angular/forms";





@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit{
  autoFocus = false;
  class: '' | 'completed' | 'editing' = '';
  title = new FormControl('', {nonNullable: true});

  @Input() todo: Todo = {id: 0, title: '', completed: false}
  @Output() updateTodo = new EventEmitter<Todo>();
  @Output() deleteTodo = new EventEmitter<number>();
  checkBox = new FormControl(false, {nonNullable: true});
  ngOnInit() {
    this.setClass();
    this.checkBox.setValue(this.todo.completed);
    this.checkBox.valueChanges
      .subscribe(dto => {
        this.setClass();
        this.emitUpdateTodo(dto);
      })
  }

  setClass(){
    this.todo.completed ? this.class = 'completed' : this.class = '';
  }

  editTodo(){
    this.class = 'editing';
    this.title.setValue(this.todo.title);
    this.autoFocus = true;
  }




  emitUpdateTodo(dto: boolean){
    this.updateTodo.emit({id: this.todo.id, completed: dto, title: this.todo.title.trim()})
  }

  updateTitle(){
    this.updateTodo.emit({id: this.todo.id, completed: this.todo.completed, title: this.title.value.trim()})
  }

  delete(){
    this.deleteTodo.emit(this.todo.id)
  }



}
