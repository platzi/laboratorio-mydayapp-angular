import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';
import { TasksService } from 'src/app/core/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  listTasks: Task[] = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.listTasks = this.tasksService.getAllTasks();
  }

  onkeyup(event: any) {
    if (event.keyCode === 13) {
      const taskName = event.target.value.trim();
      if (taskName.length > 0) {
        this.addTask(taskName);
        event.target.value = '';
      }
    }
  }

  addTask(taskName: string) {
    this.listTasks = this.tasksService.addTask(taskName);
  }

  changeStatus(task: Task): void {
    this.listTasks = this.tasksService.changeStatusTask(task);
  }

  updateName(info: { task: Task, newName: string }): void {
    this.listTasks = this.tasksService.updateNameTask(info.task, info.newName);
  }

  deleteTask(task: Task): void {
    this.listTasks = this.tasksService.deleteTask(task);
  }

  get showMainFooter(): boolean {
    return this.countItems > 0;
  }

  get itemsLeft(): number {
    return this.tasksService.getAllTasks().filter(t => !t.completed).length;
  }

  get countItems(): number {
    return this.tasksService.getAllTasks().length;
  }

}
