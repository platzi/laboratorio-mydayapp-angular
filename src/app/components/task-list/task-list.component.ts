import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTasksByFilter } from 'src/app/store/tasks.selectors';
import { Filter } from 'src/app/models';
import { changeFilter } from 'src/app/store/tasks.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  // states
  tasks$: Observable<Task[]>;

  // dependecy injection
  constructor(private route: ActivatedRoute, private store: Store) {
    this.tasks$ = this.store.select(selectTasksByFilter);
  }
  // lifecycle
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const filter = params.get('filter') as Filter;

      this.store.dispatch(changeFilter({ filter: filter || 'all' }));
    });
  }
}
