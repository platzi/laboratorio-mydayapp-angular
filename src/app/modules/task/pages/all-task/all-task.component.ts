import { Component } from '@angular/core';
import { StatusTask } from 'src/app/enums/statusTask.enum';

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent {

  statusTask: StatusTask;

  constructor() {
    this.statusTask = StatusTask.ALL;
  }

}
