import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/components/interfaces/task.interface';
import { TasksService } from 'src/app/services/tasks.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  tasks: Task[] = [];
  taskType: string = '';

  constructor(
    private taskService: TasksService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.tasks = this.taskService.getTask();

    this.route.url.subscribe(urlUbication => {
      this.taskType = urlUbication[0].path

      switch (this.taskType) {
        case 'pending':
          this.taskService.pendingTask$
            .subscribe(tasks => this.tasks = tasks);
          break;
        case 'completed':
          this.taskService.completedTask$
            .subscribe(tasks => this.tasks = tasks);
          break;
      }
    })

    this.taskService.allTasks$.subscribe(listado => {
      if(listado.length == 0){
        this.location.go('/all')
      }
    })

  }



  clearCompleted() {
    this.tasks = this.taskService.clearCompleted();
  }

}
