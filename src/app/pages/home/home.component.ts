import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  taskTitle: string = '';
  tasks: Array<Task> = [];
  
  constructor(private taskManager: TaskManagerService) {
    this.tasks = this.taskManager.getTasks();
  }

  ngOnInit(): void {
  }

  addNewTask() {
    this.taskManager.addTask(this.taskTitle);
    this.taskTitle = '';
  }

  getPending() {
    return this.taskManager.pending;
  }

  eraseCompleted() {
    this.tasks = this.taskManager.eraseCompleted();
  }

}
