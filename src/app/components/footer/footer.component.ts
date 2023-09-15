import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearCompleted } from 'src/app/store/tasks.actions';
import {
  selectCompletedTaks,
  selectFilter,
  selectPendingTaks,
  selectTaks,
} from 'src/app/store/tasks.selectors';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  // states
  tasks$ = this.store.select(selectTaks);
  filter$ = this.store.select(selectFilter);

  constructor(private store: Store) {}
}
