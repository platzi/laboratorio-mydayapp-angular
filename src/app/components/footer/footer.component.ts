import { Component, OnInit } from '@angular/core';
import { TodoService } from '@app/services/todo.service'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  constructor (private todoService: TodoService) { }
  todoList$ = this.todoService.todoList$;
  todoLength: number = 0
  ngOnInit() {
    this.todoList$.subscribe(todoList => {
      this.todoLength = todoList.filter(item => item.completed ===true).length
    })
  }
  clearCompleted(){
    this.todoService.clearCompleted()
  }

}
