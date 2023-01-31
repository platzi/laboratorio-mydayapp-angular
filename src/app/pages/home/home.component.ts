import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  inputControl = new FormControl('');

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.tasks$.subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask() {
    const task = this.inputControl.value;
    if (task) {
      this.tasksService.addTask(task.trim());
    }
    this.inputControl.setValue('');
  }
}
