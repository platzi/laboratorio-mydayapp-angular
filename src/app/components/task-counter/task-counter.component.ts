import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPendingTaks } from 'src/app/store/tasks.selectors';

@Component({
  selector: 'app-task-counter',
  templateUrl: './task-counter.component.html',
  styleUrls: ['./task-counter.component.css'],
})
export class TaskCounterComponent {
  pendingTasks$ = this.store.select(selectPendingTaks);

  constructor(private store: Store) {}
}
