import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {
  tareasNuevas: string[] = [];
  taskTitle: string = '';
  tasks: Task[] = [];
  currentRoute: string = '';
  sub;

  constructor(
    private route: ActivatedRoute,
    private taskManager: TaskManagerService
  ) {
    this.tasks = this.taskManager.getTasks();
    this.sub = this.route.url.subscribe((url) => {
      if (url.length === 0) {
        this.currentRoute = 'all';
      } else {
        this.currentRoute = url[0].path;
      }

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

  getCompleted() {
    return this.taskManager.completed;
  }

  getTotal() {
    return this.taskManager.getTasks().length;
  }

  eraseCompleted() {
    this.taskManager.eraseCompleted();
    this.filterTasks(this.currentRoute);
  }

  updateTasks() {
    this.filterTasks(this.currentRoute);
  }

  filterTasks(filter: string) {
    switch (filter) {
      case 'all':
        this.tasks = this.taskManager.getTasks();
        break;
      case 'pending':
        this.tasks = this.taskManager
          .getTasks()
          .filter((task) => !task.completed);
        console.log('estoy en peding', this.tasks);
        break;
      case 'completed':
        this.tasks = this.taskManager
          .getTasks()
          .filter((task) => task.completed);
        break;
      default:
        this.tasks = this.taskManager.getTasks();
        break;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
