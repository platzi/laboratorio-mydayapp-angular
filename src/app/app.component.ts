import { Component, OnInit } from '@angular/core';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit{

  constructor(private tasksService: TasksService) {}
  ngOnInit(): void {
      this.tasksService.getTasks();
  }
}
