import { Component } from '@angular/core';
import { TasksService } from '../shared/services/tasks/tasks.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  numberOfTasks: number;
  numberOfTasksCompleted: number;
  subscription: Subscription;
  status: string;

  constructor(private tasksService: TasksService, private route: ActivatedRoute) {
    this.subscription = Subscription.EMPTY;
    this.numberOfTasks = 0;
    this.numberOfTasksCompleted = 0;
    this.status = '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const param = this.route.snapshot.paramMap.get('status');
      if(param) {
        this.status = param;
      }
    });
    
    this.subscription = this.tasksService.tasks$.subscribe( tasks => {
      this.numberOfTasks = tasks.filter((task => task.completed === false)).length;
      this.numberOfTasksCompleted= tasks.filter((task => task.completed === true)).length;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clearCompletedTask() {
    this.tasksService.clearCompletedTask();
  }

  isActive(item?:string) {
    if(item) {
      return this.status === item;
    } else {
      return this.status === '';
    }
  }
}
