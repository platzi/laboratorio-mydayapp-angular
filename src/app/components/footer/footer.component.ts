import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit, OnDestroy {

  showFooter: boolean = false;
  showButton: number = 0;
  suscription !: Subscription;
  counter: number = 0;

  constructor(
    private taskService: TasksService
  ){
    this.showFooter = this.taskService.isEmpty();
  }

  ngOnInit(): void {
    this.suscription = this.taskService.tasksList$.subscribe( tasks => {
      if(tasks){
        this.showFooter = this.taskService.isEmpty();
        this.counter = this.taskService.getTaskPedingLength();
        this.showButton = this.taskService.getTaskCompletedLength();
      }
    });
  }

  clearTasks(){
    this.taskService.clearCompletedTasks();
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
