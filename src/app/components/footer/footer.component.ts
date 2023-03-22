import { Component, Input } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Tasks } from 'src/app/shared/model/tasks.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  itemsLeft: number = 1;
  @Input() tasks: Tasks[] | null = [];
  @Input() filterSelected: string = '';

  constructor(private tasksService: TasksService){ }

  getPendingTasksCount(): number {
    return this.tasks?.filter(task => !task.completed).length ?? 0;
  }
  someCompleted(): any {
    return this.tasks?.some((todo: Tasks) => todo.completed);
  }
  deleteCompletedTasks(){
    this.tasksService.deleteAllTaskCompleted();
  }
}
