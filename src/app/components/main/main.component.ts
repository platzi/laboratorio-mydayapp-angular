import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todos } from 'src/app/models/todos.model';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  storageKeyName = "mydayapp-angular";
  todoReactiveStorage$!: Observable<Todos[]>;
  ruta: string = "";
  todoForEditing: string = "";
  constructor(
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.ruta = params['status'];
      this.changeFilter(this.ruta || '');
    });
  }

  changeStatus(id: string): void {
    this.storageService.updateStatus(id);
  }
  changeTodoTitle(newTodoTitle: HTMLInputElement, id: string): void {
    let todoTitleFixed = newTodoTitle.value.trim();
    if (todoTitleFixed != "") {
      this.storageService.updateTodoTitle(todoTitleFixed, id);
      this.removeEditMode();
    }
  }
  changeToEditMode(id: string): void {
    this.todoForEditing = id;
  }
  removeEditMode(): void {
    this.todoForEditing = "";
  }
  deleteTodo(id: string): void {
    this.storageService.deleteTodo(id);
  }

  private changeFilter(filter: string) {
    this.todoReactiveStorage$ = this.storageService.todoReactiveStorage$.pipe(
      map((result: Todos[]) => {
        switch (filter) {
          case 'pending':
            return result.filter(f => f.completed != true)
            break;
          case 'completed':
            return result.filter(f => f.completed == true)
            break;
          default:
            return result
            break;
        }
      }))
  }

}




