import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  newTask: string = '';
  constructor(private taskService: TaskService) { }

  createNewTask() {
    this.taskService.createTask(this.newTask);
    this.newTask = '';
  }

}
