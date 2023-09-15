import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models';
import { changeTitle, remove, toggle } from 'src/app/store/tasks.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  // props
  @Input()
  set task(task: Task) {
    this._task = task;
    this.input.setValue(this._task.title);
  }

  // states
  _task!: Task;
  editMode = false;
  input = new FormControl('', { nonNullable: true });
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  // dependecy injection
  constructor(private cdRef: ChangeDetectorRef, private store: Store) {}

  // methods
  handleCheck() {
    this.store.dispatch(toggle({ id: this._task.id }));
  }

  handleRemove() {
    this.store.dispatch(remove({ id: this._task.id }));
  }

  handleDoubleClick() {
    this.editMode = true;
    this.cdRef.detectChanges();
    this.inputElement.nativeElement.focus();
  }

  handleEdit(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const title = this.input.value.trim();

      if (title !== '') {
        this.store.dispatch(
          changeTitle({ id: this._task.id, title: this.input.value.trim() })
        );
      }

      this.editMode = false;
    }

    if (e.key === 'Escape') {
      this.editMode = false;
    }
  }
}
