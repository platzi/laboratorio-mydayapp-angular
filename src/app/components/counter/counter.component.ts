import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TodoService } from '@services/todo.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent{

  pendingTodos$ = this.todoService.getPendingTodos();

  constructor(private todoService: TodoService) {}

}
