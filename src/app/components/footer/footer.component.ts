import { Component, OnInit} from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [],
})
export class FooterComponent implements OnInit {
  todos$ = this.todoService.getTodos();
  completedTodos$ = this.todoService.getCompletedTodos();
  pendingTodos: number = 0;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService
      .getPendingTodos()
      .subscribe((todos) => (this.pendingTodos = todos.length));
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }
}
