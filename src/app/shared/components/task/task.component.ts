import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  isEditing = false;
  constructor(private taskService: TaskService, private cdRef: ChangeDetectorRef) { }
  @Input() task: Task = { title: 'Learn Javascript', completed: false, id: '1' }
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;
  input = new FormControl('', { nonNullable: true });


  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  toggle() {
    this.taskService.toggle(this.task.id);
  }

  update() {
    const title = this.input.value.trim();
    if (title !== '') {
      this.taskService.updateTask(this.task.id, { ...this.task, title });
    }
  }

  escape() {
    this.isEditing = !this.isEditing;
    this.input.setValue(this.task.title);
  }

  enableEditingMode() {
    this.input.setValue(this.task.title)
    this.isEditing = !this.isEditing;
    this.cdRef.detectChanges();
    this.inputElement.nativeElement.focus();
  }
}

