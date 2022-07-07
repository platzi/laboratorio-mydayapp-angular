import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filter } from '@models/filter.model';

import { TodoService } from '@services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  todos$ = this.todoService.getTodosByFilter();

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      const filter = params.get('filter') as Filter;
      this.todoService.changeFilter(filter || 'all');
    });
  }

  ngOnInit(): void {
    this.todoService.readStorage();
  }
}
