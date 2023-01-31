import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  inputControl = new FormControl('');

  constructor(private tasksService: TasksService) {}

  addTask() {
    const task = this.inputControl.value;
    if (task?.trim()) {
      this.tasksService.addTask(task.trim());
    }
    this.inputControl.setValue('');
  }
}
