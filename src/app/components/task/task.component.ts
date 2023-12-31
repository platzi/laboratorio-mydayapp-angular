import { Component, Input } from '@angular/core';
import { task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent {

  @Input()
  task?: task;
}
