import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interface/task';
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
      this.sub = this.route.url.subscribe(url => {
        console.log("y entonces: ", url);
        if (url.length === 0) {
          this.currentRoute = 'all';
          console.log(this.currentRoute);
        } else {
          this.currentRoute = url[0].path;
        }
        // console.log(url);
        // this.currentRoute = url[0].path;
        console.log(this.currentRoute);
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

  updateTasks() {
    this.filterTasks(this.currentRoute);
  }

  filterTasks(filter: string) {
    switch (filter) {
      case 'all':
        this.tasks = this.taskManager.getTasks();
        break;
      case 'pending':
        this.tasks = this.taskManager.getTasks().filter(task => !task.completed);
        console.log("estoy en peding", this.tasks);
        break;
      case 'completed':
        this.tasks = this.taskManager.getTasks().filter(task => task.completed);
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
