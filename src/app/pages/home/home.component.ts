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

  constructor(
    private taskService: TasksService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(route => {
      switch (route['type']) {
        case 'pending':
          console.log('Se cambio a pending')
          this.taskService.allTask$.subscribe(tasks => this.tasks = tasks.filter(task => task.completed == false));
          break;
        case 'completed':
          console.log('Se cambio a completed')
          this.taskService.allTask$.subscribe(tasks => this.tasks = tasks.filter(task => task.completed == true));
          break;
        default:
          console.log('Se cambio a all')
          this.taskService.allTask$.subscribe(tasks => this.tasks = tasks);
          break;
      }
    })

  }

  clearCompleted() {
    this.tasks = this.taskService.clearCompleted();
  }

}
