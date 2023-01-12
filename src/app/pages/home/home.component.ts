import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/task.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  tasks: ITask[] = [];

  constructor() {
    var arrayTask = localStorage.getItem('tasks');
    if (arrayTask) {
      this.tasks = JSON.parse(arrayTask);
    }
  }
}
