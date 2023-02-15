import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [],
})
export class FooterComponent implements OnInit {
  todos$ = this.todoService.getTodos();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    console.log('footer');
  }
}
