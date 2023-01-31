import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task = { id: '', title: '', completed: false };
  checkboxControl = new FormControl(false);
  editing: boolean = false;
  editControl = new FormControl('');

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.checkboxControl.setValue(this.task.completed);
    this.editControl.setValue(this.task.title);
    this.checkboxControl.valueChanges.subscribe((selectedValue) => {
      this.tasksService.toogleCompleted(this.task.id, selectedValue ?? false);
    });
  }

  destroyTask() {
    this.tasksService.removeTask(this.task.id);
  }
}
