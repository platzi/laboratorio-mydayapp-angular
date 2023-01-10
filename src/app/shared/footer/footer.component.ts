import { Component, OnInit,  OnDestroy } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { map} from 'rxjs/operators'
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit,  OnDestroy  {
  totalItems$! :Subscription;
  public countItems = 0
  public completeItems = 0;
  public filter = ''
  constructor(
    private todoService: TodoService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
   

        this.activateRoute.paramMap.subscribe((params) => {
        this.filter = params.get('filter')  || '' ;
        this.totalItems$ = this.todoService.todoItems$
        .pipe(
          map(result => {

            switch (this.filter) {
              case 'pending':
                return [result.filter(f=>f.completed !=true).length , result.filter(f=>f.completed ==true).length]
                break;
                case 'completed':
                  return [result.filter(f=>f.completed ==true).length,result.filter(f=>f.completed ==true).length ]
                break;
              default:
                return [result.length, result.filter(f=>f.completed ==true).length ]
                break;
          } 
        })
        ).subscribe(
          response => {
            this.countItems = response[0]
            this.completeItems = response[1]
          }
                               )
      });  
  }

  ngOnDestroy(): void {
      this.totalItems$.unsubscribe()
  }




  removeCompleteTodo(){
    this.todoService.removeCompleteTodo();
  }

  

}
