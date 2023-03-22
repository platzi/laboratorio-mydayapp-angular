import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Tasks } from 'src/app/shared/model/tasks.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  tasks$!: Observable<Tasks[]>;
  currentPath: string = '';

  constructor(private tasksService: TasksService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(urlSegments => {
      this.currentPath = urlSegments.join('/');
      if(this.currentPath === 'pending'){
        this.tasks$ = this.tasksService.getPendingTasks();
      } else if(this.currentPath === 'completed'){
        this.tasks$ = this.tasksService.getCompletedTasks();
      } else {
        this.tasks$ = this.tasksService.getTasks();
      }
    })
  }
}
