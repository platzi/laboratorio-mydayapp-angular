import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Todos } from 'src/app/models/todos.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  storageKeyName:string = 'mydayapp-angular';
  amountTodosPending: number = 0;
  ruta: string = "";
  noCompletedTasks: boolean = true;
  constructor(
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.storageService.todoReactiveStorage$.subscribe({
      next: (todos: Todos[]) =>{
        this.amountTodosPending = todos.filter(todo => !todo.completed).length;
        todos.length == this.amountTodosPending ? this.noCompletedTasks = true : this.noCompletedTasks = false;
      }
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      this.ruta = params['status'];
    });
  }
  clearCompleted(): void {
    this.storageService.clearCompleted();
  }
}
