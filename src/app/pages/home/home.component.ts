import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TasksService } from '../../core/services/tasks.service';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: string = '';

  get pendingTasks(): number {
    return this.tasks.reduce((acc, task) => (task.completed ? acc : ++acc), 0);
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.tasks = this._tasksService.tasks;
  }

  saveTask(task: string): void {
    const newTask: Task = {
      completed: false,
      id: `task-${this.tasks.length + 1}`,
      title: task,
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  selectTask(taskId: string): void {
    if (taskId) {
      this.selectedTask = taskId;
      this._changeDetectorRef.detectChanges();
    } else this.saveTasks();
  }

  deleteTask(taskId: string): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    this.tasks.splice(taskIndex, 1);
    this.saveTasks();
  }

  clearCompleted(): void {
    this.tasks = this.tasks.filter((task) => !task.completed);
    this.saveTasks();
  }

  saveTasks(): void {
    this._tasksService.tasks = this.tasks;
  }
}
