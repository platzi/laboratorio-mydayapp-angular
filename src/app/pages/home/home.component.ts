import { ChangeDetectorRef, Component } from '@angular/core';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  tasks: Task[] = [];
  selectedTask: string = '';

  get pendingTasks(): number {
    return this.tasks.reduce((acc, task) => (task.completed ? acc : ++acc), 0);
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  saveTask(task: string): void {
    const newTask: Task = {
      completed: false,
      id: `task-${this.tasks.length + 1}`,
      title: task,
    };
    this.tasks.push(newTask);
  }

  selectTask(taskId: string): void {
    this.selectedTask = taskId;
    this.changeDetectorRef.detectChanges();
  }

  deleteTask(taskId: string): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    this.tasks.splice(taskIndex, 1);
  }

  clearCompleted(): void {
    this.tasks = this.tasks.filter((task) => !task.completed);
  }
}
