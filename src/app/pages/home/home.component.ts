import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tasks: ITask[] = [];
  tasksNumber: number = 0;
  taskTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.tasksNumber = this.tasks.length;
  }

  addTask(event: KeyboardEvent) {
    if (event.key == 'Enter' && this.taskTitle.trim() !== '') {
      this.tasks.push({
        id: this.tasksNumber.toString(),
        title: this.taskTitle.trim(),
        completed: false,
      });

      this.taskService.addTask(this.tasks);

      this.tasksNumber++;
      this.taskTitle = '';
    }
  }
}
