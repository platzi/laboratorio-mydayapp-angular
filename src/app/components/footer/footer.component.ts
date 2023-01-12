import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {


  pendingTasks: number = 0;

  itemMap = {
    '=1': 'item left',
    'other': 'items left'
  }

  constructor(
    private taskService: TasksService
  ) { 

  }

  ngOnInit(): void {
    this.taskService.pendingTask$
    .subscribe(pendingTask => {
      this.pendingTasks = pendingTask.length
    })
  }



}
