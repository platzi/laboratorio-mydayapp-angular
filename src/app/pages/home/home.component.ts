import { Component, OnInit } from '@angular/core';
import { todoItem } from 'src/app/models/todoItem.interface';
import { TodoService } from 'src/app/services/todo.service';
import { map, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  totalItems$! :Subscription;
  public todoItems$! :Observable<todoItem[]>
  public countItems = 0
  
  constructor(
    private todoService:TodoService,
    private activateRoute: ActivatedRoute
    ) { }
  
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      const filter = params.get('filter')  ;
      this.changeFilter(filter || '');
    });

    this.totalItems$ = this.todoService.todoItems$
    .pipe(
      map(items => items.length )
    ).subscribe(
      response => this.countItems = response
    )

  
  }

  private changeFilter(filter:string ){
    this.todoItems$ = this.todoService.todoItems$.pipe( 
      map(result =>{
        switch (filter) {
          case 'pending':
            return result.filter(f=>f.completed !=true) 
            break;
            case 'completed':
              return result.filter(f=>f.completed ==true) 
            break;
          default:
            return result 
            break;
        }
      
    } ))
  }


  ngOnDestroy(): void {
    this.totalItems$.unsubscribe()
}

}
