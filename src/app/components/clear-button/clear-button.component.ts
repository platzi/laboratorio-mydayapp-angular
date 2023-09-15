import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearCompleted } from 'src/app/store/tasks.actions';
import { selectCompletedTaks } from 'src/app/store/tasks.selectors';

@Component({
  selector: 'app-clear-button',
  templateUrl: './clear-button.component.html',
  styleUrls: ['./clear-button.component.css'],
})
export class ClearButtonComponent {
  // states
  completedTasks$ = this.store.select(selectCompletedTaks);

  constructor(private store: Store) {}

  // methods
  handleClearCompleted() {
    this.store.dispatch(clearCompleted());
  }
}
