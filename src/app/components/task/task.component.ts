import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  @Input() task: Task | null = null;

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.task!.completed = !this.task!.completed;
  }
}
