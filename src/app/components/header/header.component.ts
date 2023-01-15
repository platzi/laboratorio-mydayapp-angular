import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  valueTodo = '';
  input = new FormControl('', {nonNullable: true});

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  addTodo() {
    const title = this.input.value.trim();
    if (title !== '') {
      console.log(title);
      this.todoService.add(title);
      this.input.setValue('');
    }
  }

}
