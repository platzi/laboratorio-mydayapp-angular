import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {

  @Input() listTasks: Task[] = [];
  @Output() changeStatus = new EventEmitter<Task>();
  @Output() changeName = new EventEmitter<{ task: Task, newName: string }>();
  @Output() deleteTasks = new EventEmitter<Task>();

  editingTaskId: number | null = null;
  isCompleted = false;

  isTaskCompleted(task: Task): boolean {
    return task.completed;
  }

  changeStatusTask(task: Task): void {
    this.changeStatus.emit(task);
  }

  updateNameTask(event: any, task: Task): void {
    const newName: string = event.target.value.trim();
    this.changeName.emit({ task, newName });
    this.editingTaskId = null;
  }

  deleteTask(task: Task): void {
    this.deleteTasks.emit(task);
  }

  startEditingTask(task: Task): void {
    this.editingTaskId = task.id;
    const inputElement = document.getElementById(`inputTaskName${task.id}`);
    setTimeout(() => {
      if (inputElement) {
        inputElement.focus();
      }
    }, 100);
  }

}
