import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.readPath()
    this.loadStoredTasks();
  }

  get tasks() {
    return this.filterTasks(this.filter);
  }

  set tasks(tasks: Task[]) {
    this.allTasks = tasks;
  }

  get showContent() {
    return this.tasks.length > 0;
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
      id: this.tasks.length.toString(),
      title,
      completed: false,
    });
    this.storeTasks();
  }

  onClearCompleted() {
    this.tasks = this.pendingTasks;
    this.storeTasks();
  }

  storeTasks() {
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.allTasks));
  }

  loadStoredTasks() {
    const storedTasks = localStorage.getItem('mydayapp-angular');
    if (storedTasks) this.tasks = JSON.parse(storedTasks);
  }

  onUpdateTask(task: Task) {
    const taskMatch = this.allTasks.findIndex((t) => t.id === task.id);
    if (taskMatch > -1) this.tasks[taskMatch] = task;
    this.storeTasks();
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
