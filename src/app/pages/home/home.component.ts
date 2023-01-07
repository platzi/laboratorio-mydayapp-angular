import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public tasks: Task[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadStoredTasks();
  }

  get showContent() {
    return this.tasks.length > 0;
  }

  get pendingTasks() {
    return this.tasks.filter((task) => !task.completed);
  }

  get completedTasks() {
    return this.tasks.filter((task) => task.completed);
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
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
  }

  loadStoredTasks() {
    const storedTasks = localStorage.getItem('mydayapp-angular');
    if (storedTasks) this.tasks = JSON.parse(storedTasks);
  }

  onUpdateTask(task: Task) {
    const taskMatch = this.tasks.findIndex((t) => t.id === task.id);
    if (taskMatch > -1) this.tasks[taskMatch] = task;
    this.storeTasks()
  }
}
