import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  @Output() clearCompleted = new EventEmitter();

  tasks: number = 0;
  pendingTasks: number = 0;
  completedTasks: number = 0;

  itemMap = {
    '=1': 'item left',
    'other': 'items left'
  }

  constructor(
    private taskService: TasksService
  ) { 

  }

  ngOnInit(): void {
    this.taskService.allTasks$
    .subscribe(tasks => this.tasks = tasks.length)
    this.taskService.pendingTask$
    .subscribe(pendingTask => {
      this.pendingTasks = pendingTask.length
    })
    this.taskService.completedTask$
    .subscribe(completedTask => {
      this.completedTasks = completedTask.length
    })
  }

  clear(){
    this.clearCompleted.emit();  
    this.completedTasks = 0; 
  }


}
