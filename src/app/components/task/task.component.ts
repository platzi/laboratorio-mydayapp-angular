import { Component, Input } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task = {
    id: -1,
    title: '',
    completed: false
  }

  constructor( ) { }
}
