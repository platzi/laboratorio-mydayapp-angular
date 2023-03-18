import { Component, OnDestroy } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';
import { TaskManagerService } from 'src/app/core/services/task-manager.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {
  taskTitle: string = '';
  tasks: Task[] = [];
  currentRoute: string = '';
  subs: Subscription;

  constructor(
    private taskManager: TaskManagerService,
    private route: ActivatedRoute
  ) {
    this.tasks = this.taskManager.getTasks();
    this.subs = this.route.url.subscribe(url => {
      if (url.length === 0)
        this.currentRoute = 'all';
      else
        this.currentRoute = url[0].path;

      this.filterTasks(this.currentRoute);
    });
  }

  addNewTask() {
    this.taskManager.addTask(this.taskTitle);
    this.taskTitle = '';
  }

  getPending() {
    return this.taskManager.pending;
  }

  eraseCompleted() {
    this.taskManager.eraseCompleted();
    this.filterTasks(this.currentRoute);
  }

  getCompleted() {
    return this.taskManager.completed;
  }

  getTotal() {
    return this.taskManager.getTasks().length;
  }

  filterTasks(filter: string) {
    switch (filter) {
      case 'all':
        this.tasks = this.taskManager.getTasks();
        break;

      case 'pending':
        this.tasks = this.taskManager.getTasks().filter(task => !task.completed);
        break;

      case 'completed':
        this.tasks = this.taskManager.getTasks().filter(task => task.completed);
        break;

      default:
        this.tasks = this.taskManager.getTasks();
        break;
    }
  }

  updateTasks() {
    this.filterTasks(this.currentRoute);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
