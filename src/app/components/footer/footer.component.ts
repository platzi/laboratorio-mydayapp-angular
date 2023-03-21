import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { CategoryFilter } from 'src/app/shared/model/category-filter.type';
import { Tasks } from 'src/app/shared/model/tasks.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() tasks: Tasks[] | null = [];
  @Input() filterSelected: CategoryFilter = 'all';

  constructor(private tasksService: TasksService){ }
  getTasks(): Tasks[]{
    return this.tasks || []
  }
  someCompleted(): any {
    return this.tasks?.some((todo: Tasks) => todo.completed);
  }
  deleteCompletedTasks(){
    this.tasksService.deleteAllTaskCompleted();
  }
}
