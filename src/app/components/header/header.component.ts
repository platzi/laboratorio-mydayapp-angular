import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  txtInput!: FormControl;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.txtInput = new FormControl('', Validators.required);
  }

  addTodo() {
    if (this.txtInput.invalid) return;
    this.todoService.addTodo(new Todo(this.txtInput.value.trim()));
    this.txtInput.reset();
  }
}
