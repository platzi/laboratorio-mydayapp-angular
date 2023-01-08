import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {ActivatedRoute} from '@angular/router';
import {FilterTodoEnum} from '../../enum/filter-todo.enum';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos$ = this.todoService.getTodoByFilter();

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe( params => {
      console.log(params);
      let filter = params.get('filter') as FilterTodoEnum;
      console.log(filter);
      this.todoService.changeFilter(filter || FilterTodoEnum.ALL);
    });
  }

  ngOnInit(): void {
    console.log('INIT TODOS');
    this.todoService.readStorage();
    //this.todos$ = this.todoService.getTodoByFilter();
  }

}
