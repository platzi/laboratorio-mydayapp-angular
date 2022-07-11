import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TodoService } from '@services/todo.service';

@Component({
  selector: 'app-clear-btn',
  templateUrl: './clear-btn.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearBtnComponent {

  completedTodos$ = this.todoService.getCompletedTodos();

  constructor(private todoService: TodoService) {}

  clear() {
    this.todoService.clearCompleted();
  }

}
