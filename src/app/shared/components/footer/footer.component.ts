import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private taskService: TaskService) { }
  $tasks = this.taskService.getTasks();
  $pendingCounter = this.taskService.getPendingTasks();
  completedTask$ = this.taskService.getCompletedTasks();
  filter$ = this.taskService.getFilter();

  clearCompleted() {
    this.taskService.clearCompleted();
  }

}
