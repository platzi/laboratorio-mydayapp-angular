import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  taskTitle: string = '';
  tasks: Array<Task> = [];
  currentRoute: string = '';
  sub;
  
  constructor(
    private route: ActivatedRoute,
    private taskManager: TaskManagerService) {
      this.tasks = this.taskManager.getTasks();
      this.subs = this.route.url.subscribe(url => {
        this.currentRoute = url[0].path;
        this.filterTasks(this.currentRoute);
      });
    }

  ngOnInit(): void { }

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

  filterTasks(filter: string) {

    switch (filter) {
      case 'all':
        this.tasks = this.taskManager.getTasks();
        console.log(this.tasks);
        break;
      case 'pending':
        this.tasks = this.taskManager.getTasks().filter(task => !task.completed);
        console.log(this.tasks);
        break;
      case 'completed':
        this.tasks = this.taskManager.getTasks().filter(task => task.completed);
        console.log(this.tasks);
        break;
      default:
        this.tasks = this.taskManager.getTasks();
         console.log("default switch");
        break;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
