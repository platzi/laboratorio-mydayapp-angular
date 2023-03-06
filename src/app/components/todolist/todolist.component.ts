import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {
  @Input() todos: Array<Todo> = [];

  constructor() { }
}
