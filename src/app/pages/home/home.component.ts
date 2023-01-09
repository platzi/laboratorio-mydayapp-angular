import { Component, OnInit } from '@angular/core';
import { todoItem } from 'src/app/models/todoItem.interface';
import { TodoService } from 'src/app/services/todo.service';
import { map, Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  totalItems$! :Subscription;
  public todoItems$! :Observable<todoItem[]>
  public countItems = 0
  
  constructor(
    private todoService:TodoService
    ) { }
  
  ngOnInit(): void {
    this.totalItems$ = this.todoService.todoItems$
    .pipe(
      map(items => items.length )
    ).subscribe(
      response => this.countItems = response
    )

    this.todoItems$ = this.todoService.todoItems$
  }


  ngOnDestroy(): void {
    this.totalItems$.unsubscribe()
}

}
