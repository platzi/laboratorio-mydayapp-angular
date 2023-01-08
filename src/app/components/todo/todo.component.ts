import {Component, Input, OnInit} from '@angular/core';
import {TodoModel} from '../../models/todo.model';
import {FormControl} from '@angular/forms';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  editMode = false;
  input = new FormControl('', {nonNullable: true});
  @Input() todo: TodoModel = {id: '', title:'', completed: false};
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  onDbClickEnabledEdit() {
    this.editMode = !this.editMode;
    this.input.setValue(this.todo.title);
  }

  onUpdate() {
    const title = this.input.value.trim();
    if (title !== '') {
      this.todoService.update(this.todo.id, title);
      this.onEscape();
    }
  }

  onRemove() {
    this.todoService.remove(this.todo.id);
  }

  onEscape() {
    this.editMode = !this.editMode;
    this.input.setValue(this.todo.title);
  }

  onChangeStatus() {
    this.todoService.toggle(this.todo.id);
  }

}
