import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/core/models/task.model';
import { TasksService } from 'src/app/core/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  listTasks: Task[] = [];

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.refreshListTasks();
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
    this.tasksService.addTask(taskName);
    this.refreshListTasks();
  }

  changeStatus(task: Task): void {
    this.tasksService.changeStatusTask(task);
    this.refreshListTasks();
  }

  updateName(info: { task: Task, newName: string }): void {
    this.tasksService.updateNameTask(info.task, info.newName);
    this.refreshListTasks();
  }

  deleteTask(task: Task): void {
    this.tasksService.deleteTask(task);
    this.refreshListTasks();
  }

  deleteCompletedTasks(): void {
    this.tasksService.deleteCompletedTasks();
    this.refreshListTasks();
  }

  refreshListTasks(): void {
    this.route.url.subscribe(url => {
      const filter = url[0]?.path;
      if (filter) {
        this.listTasks = this.tasksService.getTasksByStatus(filter);
      } else {
        this.listTasks = this.tasksService.getAllTasks();
      }
    });
  }

  get showMainFooter(): boolean {
    return this.countItems > 0;
  }

  get itemsLeft(): number {
    return this.tasksService.getAllTasks().filter(t => !t.completed).length;
  }

  get itemsCompleted(): number {    
    return this.tasksService.getAllTasks().filter(t => t.completed).length;
  }

  get countItems(): number {
    return this.tasksService.getAllTasks().length;
  }

}
