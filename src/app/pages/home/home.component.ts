import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TasksService } from '../../core/services/tasks.service';
import { Task } from '../../core/models/task.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private _tasks: Task[] = [];
  private _viewTasks: Task[] = [];
  get viewTasks(): Task[] {
    return this._viewTasks;
  }
  selectedTask: string = '';

  get totalTasks(): number {
    return this._tasks.length;
  }

  get pendingTasks(): number {
    return this._tasks.reduce((acc, task) => (task.completed ? acc : ++acc), 0);
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _tasksService: TasksService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._tasks = this._tasksService.tasks;
    this._activatedRoute.data.subscribe((data) => {
      switch (data['filter']) {
        case 'pending':
          this._viewTasks = this._tasks.filter((task) => !task.completed);
          break;
        case 'completed':
          this._viewTasks = this._tasks.filter((task) => task.completed);
          break;
        default:
          this._viewTasks = this._tasks;
          break;
      }
    });
  }

  saveTask(task: string): void {
    const newTask: Task = {
      completed: false,
      id: `task-${this._tasks.length + 1}`,
      title: task,
    };
    this._tasks.push(newTask);
    this.saveTasks();
  }

  selectTask(taskId: string): void {
    this.selectedTask = taskId;
    this._changeDetectorRef.detectChanges();
  }

  deleteTask(taskId: string): void {
    const taskIndex = this._tasks.findIndex((task) => task.id === taskId);
    this._tasks.splice(taskIndex, 1);
    this.saveTasks();
  }

  clearCompleted(): void {
    this._tasks = this._tasks.filter((task) => !task.completed);
    this.saveTasks();
  }

  saveTasks(): void {
    this._tasksService.tasks = this._tasks;
  }
}
