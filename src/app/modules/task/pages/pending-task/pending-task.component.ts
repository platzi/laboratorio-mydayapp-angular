import { Component } from '@angular/core';
import { StatusTask } from 'src/app/enums/statusTask.enum';

@Component({
  selector: 'app-pending-task',
  templateUrl: './pending-task.component.html',
  styleUrls: ['./pending-task.component.css']
})
export class PendingTaskComponent {
  statusTask: StatusTask;

  constructor() {
    this.statusTask = StatusTask.PENDING;
  }
}
