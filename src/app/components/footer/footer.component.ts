import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [],
})
export class FooterComponent {
  todos$ = this.todoService.getTodos();
  pendingTodos$ = this.todoService.getPendingTodos();
  completedTodos$ = this.todoService.getCompletedTodos();
  

  constructor(private todoService: TodoService) {}

  clearCompleted() {
    this.todoService.clearCompleted();
  }
}
