import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  todos: Array<Todo> = [];
  pending: number = 0;
  completed: number = 0;
  thereareTodos = false;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService) { 

      this.route.url.subscribe(url => {
        if (url.length === 0) {
          sharedService.actualizarCurrentRoute('all');
          this.filterTodos('all');
        } else {
          sharedService.actualizarCurrentRoute(url[0].path)
          this.filterTodos(url[0].path);
        }
      });
    
  }

  ngOnInit(): void {
    this.sharedService.todoPendientes$.subscribe(
       pending => this.pending += pending
     );

    this.sharedService.todoCompleted$.subscribe(
      completed => this.completed += completed
    );
   }
 
  actualizarValor(nuevoValor: any) {

//    this.pending += Number(nuevoValor);
  }

  filterTodos(currentRoute: string) {
    this.sharedService.getTodosData().subscribe(value => {

      this.pending = value.filter(task => !task.completed).length;
      this.completed = value.filter(task => task.completed).length;

      this.thereareTodos = value.length > 0;
      this.sharedService.actualizarTodoPendientes(0);
      switch (currentRoute) {
        case 'all':
          this.todos = value;
          break;
        case 'pending':
          this.todos = value.filter(todo => !todo.completed);
          break;
        case 'completed':
          this.todos = value.filter(todo => todo.completed);
          break;
        default:
          this.todos = value;
          break;
      }  
    });
  }
}
