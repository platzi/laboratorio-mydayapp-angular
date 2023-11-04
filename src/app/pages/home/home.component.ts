import { Component } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';
import { TasksService } from 'src/app/core/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private tasksService: TasksService) { }

  listTasks: Task[] = [];

  onkeyup(event: any) {
    if (event.keyCode === 13) {
      const taskName = event.target.value.trim();
      if (taskName.length > 0) {
        this.addTask(taskName);
        event.target.value = '';
      }
    }
  }

  addTask(taskName: string) {
    this.listTasks = this.tasksService.addTask(taskName);
  }

  get showMainFooter(): boolean {
    return this.tasksService.getAllTasks().length > 0;
  }

}
