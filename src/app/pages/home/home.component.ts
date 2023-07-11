import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  hasTasks: boolean;
  subscription: Subscription;

  constructor(private tasksService: TasksService) {
    this.subscription = Subscription.EMPTY;
    this.hasTasks = false;
  }
  
  ngOnInit(): void {
    this.tasksService.getLocalStorage();
    this.subscription = this.tasksService.tasks$.subscribe( tasks => {
      this.hasTasks = tasks.length >0 ? true : false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
