import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { add } from 'src/app/store/tasks.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // states
  newTask = new FormControl('');

  // dependency injection
  constructor(private store: Store) {}

  // methods
  addTask() {
    const title = this.newTask.value?.trim();

    if (!title) {
      return;
    }

    this.newTask.setValue('');

    this.store.dispatch(add({ title }));
  }
}
