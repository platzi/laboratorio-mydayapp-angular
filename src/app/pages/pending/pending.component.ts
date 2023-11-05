import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html'
})
export class PendingComponent implements OnInit, OnDestroy {

  pendingTask: Task[] = [];
  suscription !: Subscription;

  constructor(
    private taskService: TasksService
  ) { }

  ngOnInit(): void {
    this.suscription = this.taskService.tasksList$.subscribe( tasks => {
      if(tasks){
        this.pendingTask = this.taskService.getTaskPeding();
      }
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
