import { Component } from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {FilterTodoEnum} from '../../enum/filter-todo.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  todos$ = this.todoService.getTodos();
  filter$ = this.todoService.getFilter();
  filterTodo = FilterTodoEnum;
  constructor(private todoService: TodoService) { }

}
