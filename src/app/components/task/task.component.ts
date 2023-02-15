import { Component, Input, Output, EventEmitter, ViewChildren, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { Task, TaskEdited } from '../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: [],
})
export class TaskComponent {

  @ViewChildren('inputEdit') inputEdit!: QueryList<ElementRef<HTMLInputElement>>;

  @Input() tasks: Task[] = [];

  @Output() editTaskEvent = new EventEmitter<TaskEdited>();
  @Output() toggleTaskEvent = new EventEmitter<number>();
  @Output() destroyTaskEvent = new EventEmitter<number>();

  public taskEdited?: TaskEdited | null;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  editingTask(task: Task, index: number): void {
    this.taskEdited = {
      id: index,
      title: task.title,
      completed: task.completed,
    }
    this.cdRef.detectChanges();
    this.inputEdit.toArray()[index].nativeElement.focus();
  }

  confirmEdition(index: number): void {
    if (this.inputEdit.toArray()[index].nativeElement.value) {
      this.editTaskEvent.emit({
        id: this.taskEdited?.id ?? 0,
        title: this.inputEdit.toArray()[index].nativeElement.value.trim(),
        completed: this.taskEdited?.completed ?? false,
      });
      this.cancelEdition();
    }
  }

  cancelEdition(): void {
    this.taskEdited = null;
  }

  toggleTask(index: number): void {
    this.toggleTaskEvent.emit(index);
  }

  destroyTask(index: number): void {
    this.destroyTaskEvent.emit(index);
  }

}
