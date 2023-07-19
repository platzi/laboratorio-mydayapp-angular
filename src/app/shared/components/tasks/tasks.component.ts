import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Filter } from 'src/app/models/filter.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  $tasks: Observable<Task[]> = this.taskService.getTasksByFilter();

  constructor(private taskService: TaskService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      const filter = params.get('filter') as Filter;
      this.taskService.changeFilter(filter || 'all');
    });
  }

  ngOnInit(): void {
    this.taskService.readStorage();
  }

}
