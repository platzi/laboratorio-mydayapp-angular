import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html'
})
export class TasksListComponent implements OnInit, OnDestroy {

  showList: boolean = false;
  @Input() tasksList: Task[] = [];
  suscription !: Subscription;

  constructor(
    private taskService: TasksService
  ){
    this.showList = this.taskService.isEmpty();
  }

  ngOnInit(): void {
    this.suscription = this.taskService.tasksList$.subscribe( tasks => {
      if(tasks){
        this.showList = this.taskService.isEmpty();
      }
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
