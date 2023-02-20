import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: [],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @ViewChild('inputControl') txtInputControl!: ElementRef;

  chkCompleted!: FormControl;
  txtInput!: FormControl;
  isEditing: boolean = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.chkCompleted = new FormControl(this.todo.completed);
    this.txtInput = new FormControl(this.todo.title, Validators.required);
    this.chkCompleted.valueChanges.subscribe((toggle) => {
      this.todoService.toggle(this.todo.id);
     });
  }

  startEdit() {
    this.isEditing = true;
    this.txtInput.setValue(this.todo.title);
    setTimeout(() => {
      this.txtInputControl.nativeElement.select();
    }, 1);
  }

  finishEditing() {
    this.isEditing = false;

    if (this.txtInput.invalid) {
      return;
    }
    let value = this.txtInput.value.trim();
    if (value === this.todo.title) {
      return;
    }
    console.log('finishEditing');
    this.todoService.editTodo(this.todo.id, value);
  }

  removeTodo() {
    this.todoService.removeTodo(this.todo.id);
  }
}
