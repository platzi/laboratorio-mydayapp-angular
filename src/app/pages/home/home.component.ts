import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  inputValue = '';
  tasks!: Task[];

  constructor(
    private tasksService: TasksService
  ) { }

  createNewTask(){
    if(this.inputValue.length > 0){
      this.tasksService.createTask(this.inputValue);
      this.inputValue = '';
    }
  }

  ngOnInit(): void {
    this.tasksService.storage$
    .subscribe(tasksArr => this.tasks = tasksArr);
  }

  onCompleteTask(event: Event){
    const { target } = event;
    const { checked, value } = target as HTMLInputElement;
    this.tasksService.completeTask(value, checked);
  }
}
