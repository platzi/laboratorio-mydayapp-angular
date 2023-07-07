import { Component } from '@angular/core';
import { TasksService } from '../shared/services/tasks/tasks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  task: string;

  constructor(private tasksService: TasksService) {
    this.task = '';
  } 

  addTask() {
    let taskTitle = this.task.trim();
    if(taskTitle.length > 0 ){
      this.tasksService.addTask(taskTitle);
      this.task = '';
    }
  }
}
