import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Tasks } from 'src/app/shared/model/tasks.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  tasks$!: Observable<Tasks[]>;

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasks$ = this.tasksService.getTasks();
  }
}
