import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TodoService } from '@services/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {

  todos$ = this.todoService.getTodos();
  filter$ = this.todoService.getFilter();

  constructor(private todoService: TodoService) {}

}
