import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html'
})
export class CompletedComponent implements OnInit, OnDestroy {

  completedTask: Task[] = [];
  suscription !: Subscription;

  constructor(
    private taskService: TasksService
  ) { }

  ngOnInit(): void {
    this.suscription = this.taskService.tasksList$.subscribe( tasks => {
      if(tasks){
        this.completedTask = this.taskService.getTaskCompleted();
      }
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
