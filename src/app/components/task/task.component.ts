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
  isEditable : boolean = false;
  newValue: string = ''

  constructor(
    private taskService: TasksService
  ) { }

  ngOnInit(): void {
    this.newValue = this.task.title
  }

  toogleComplete(){
    this.task.completed = !this.task.completed;
    this.taskService.updateTask(this.task)
  }

  delete(){
    this.taskService.deleteTask(this.task);
  }

  editTask(){
    this.task.title = this.newValue.trim();
    this.taskService.updateTask(this.task);;
    this.isEditable = false;
  }

  discard(){
    this.isEditable = false;
    this.newValue = this.task.title
  }

}
