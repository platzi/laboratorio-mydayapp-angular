import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task';
import { StorageService } from '../../services/storage.service';

interface Filters {
  [key: string]: Task[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private allTasks: Task[] = [];
  private filter: string = 'all';

  constructor(private storageService: StorageService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.readPath()
    this.allTasks = this.storageService.load();
  }

  get tasks() {
    return this.filterTasks(this.filter);
  }

  set tasks(tasks: Task[]) {
    this.allTasks = tasks;
  }

  get showContent() {
    return this.tasks.length > 0 || this.filter !== 'all';
  }

  get pendingTasks() {
    return this.allTasks.filter((task) => !task.completed);
  }

  get completedTasks() {
    return this.allTasks.filter((task) => task.completed);
  }

  get pendingTasksCount() {
    return this.pendingTasks.length;
  }

  get canClear() {
    return this.completedTasks.length > 0;
  }

  onAddTask(title: string) {
    this.tasks.push({
      id: this.allTasks.length.toString(),
      title,
      completed: false,
    });
    this.storageService.save(this.allTasks);
  }

  onClearCompleted() {
    this.tasks = this.pendingTasks;
    this.storageService.save(this.allTasks);
  }

  onUpdateTask(task: Task) {
    const taskMatch = this.allTasks.findIndex((t) => t.id === task.id);
    if (taskMatch > -1) this.tasks[taskMatch] = task;
    this.storageService.save(this.allTasks);
  }

  filterTasks(filter: string) {
    const filters: Filters = {
      all: this.allTasks,
      pending: this.allTasks.filter((t) => !t.completed),
      completed: this.allTasks.filter((t) => t.completed),
    };
    return filters[filter];
  }

  readPath(){
    this.route.url.subscribe((data) => {
      if (data[0]) this.filter = data[0].path;
    });
  }
}
