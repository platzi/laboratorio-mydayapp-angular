import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TodoService } from '@services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  input = new FormControl('', { nonNullable: true });

  constructor(
    private todoService: TodoService
  ) {}

  addTodo() {
    const title = this.input.value.trim();
    if (title !== '') {
      this.todoService.add(title);
      this.input.setValue('');
    }
  }
}
