import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/components/interfaces/task.interface';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  tasks: Task[] = []

  constructor(
    private taskService: TasksService
  ) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getTask();
  }

}
