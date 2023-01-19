import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() selectedTask: EventEmitter<string> = new EventEmitter();
}
