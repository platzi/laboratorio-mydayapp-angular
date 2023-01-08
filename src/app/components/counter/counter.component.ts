import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {async, map} from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  counter$ = this.todoService.getTodosPending().pipe(map(todos => todos.length));
  constructor(private todoService: TodoService) { }

}
