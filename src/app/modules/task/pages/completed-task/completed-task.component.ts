import { Component } from '@angular/core';
import { StatusTask } from 'src/app/enums/statusTask.enum';

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.css']
})
export class CompletedTaskComponent {
  statusTask: StatusTask;

  constructor() {
    this.statusTask = StatusTask.COMPLETED;
  }
}
