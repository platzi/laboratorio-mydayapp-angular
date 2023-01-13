import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/components/interfaces/task.interface';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    private taskService: TasksService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(route => {
      switch (route['type']){
        case 'pending':
          this.taskService.pendingTask$.subscribe(task=> this.tasks = task)
          break;
        case 'completed':
          this.taskService.completedTask$.subscribe(task=> this.tasks = task)
          break;
        default:
          this.taskService.allTask$.subscribe(tasks => this.tasks = tasks);
          break;
      }
    })

  }

  clearCompleted(){
    this.tasks = this.taskService.clearCompleted()
  }

}
