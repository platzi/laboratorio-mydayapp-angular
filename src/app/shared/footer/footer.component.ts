import { Component, OnInit,  OnDestroy } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { map} from 'rxjs/operators'
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit,  OnDestroy  {
  totalItems$! :Subscription;
  public countItems = 0
  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
     this.totalItems$ = this.todoService.todoItems$
                                .pipe(
                                  map(items => items.length )
                                ).subscribe(
                                  response => this.countItems = response
                                )
  }

  ngOnDestroy(): void {
      this.totalItems$.unsubscribe()
  }

  

}
