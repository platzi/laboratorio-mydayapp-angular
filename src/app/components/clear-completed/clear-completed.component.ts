import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-clear-completed',
  template: `
    <button
      data-testid="clear-completed-btn"
      class="clear-completed"
      (click)="todoService.removeCompletedTodos()">
      Clear completed
    </button>
  `,
  styles: []
})
export class ClearCompletedComponent {

  constructor(
    public todoService: TodoService
  ) { }
}
