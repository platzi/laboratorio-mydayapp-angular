import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() selectedTask: EventEmitter<string> = new EventEmitter();
  @ViewChild('taskEditInput') taskEditInput!: ElementRef<HTMLInputElement>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  selectTask(): void {
    this.selectedTask.emit(this.task.id);
    this.changeDetectorRef.detectChanges();
    this.taskEditInput.nativeElement.focus();
  }

  editTask(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      const value = input.value.trim();
      if (value) this.task.title = value;
      this.selectedTask.emit('');
    } else if (event.key === 'Escape') {
      this.selectedTask.emit('');
    }
  }
}
