import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  countCompleted = 0;
  countPending = 0;
  totalCount = 0;
  inputControl = new FormControl('');
  filterName: string | null = '';

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.filterName = params.get('filter') ?? '';
      if(this.filterName && !['pending', 'completed', 'all'].some(filter => filter === this.filterName)) {
       this.router.navigate(['/'])
      }
      this.tasks$ = this.tasksService.tasks$.pipe(
        map((data) => {
          this.countCompleted = data.filter((task) => task.completed).length;
          this.countPending = data.length - this.countCompleted;
          this.totalCount = data.length;
          switch (this.filterName) {
            case 'pending':
              return data.filter((task) => !task.completed);
            case 'completed':
              return data.filter((task) => task.completed);
            default:
              return data;
          }
        })
      );
    });
  }

  addTask() {
    const task = this.inputControl.value;
    if (task?.trim()) {
      this.tasksService.addTask(task.trim());
    }
    this.inputControl.setValue('');
  }

  clearCompleted() {
    this.tasksService.clearCompleted();
  }
}
