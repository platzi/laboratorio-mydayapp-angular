import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  taskTitle: string = '';
  tasks: Task[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
