import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from '../interfaces/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styles: [
  ]
})
export class TaskComponent implements OnInit {

  @Input() task!: Task;

  constructor(
    private taskService: TasksService
  ) { }

  ngOnInit(): void {
  }

  toogleComplete(){
    this.task.completed = !this.task.completed;
    this.taskService.updateTask(this.task)
  }

  delete(){
    this.taskService.deleteTask(this.task);
  }

}
