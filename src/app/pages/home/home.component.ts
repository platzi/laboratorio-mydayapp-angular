import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Tasks } from 'src/app/shared/model/tasks.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tasks: Tasks[];

  constructor(private tasksService: TasksService) {
    this.tasks = [];
  }

  ngOnInit(): void {
    this.tasks = this.tasksService.tasksList;
  }

}
