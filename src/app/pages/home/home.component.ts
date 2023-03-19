import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subject, Subscription } from 'rxjs'
import { TODO } from 'src/app/models/todo.model'
import { TodoService } from 'src/app/services/todo.service'
import { TodoStatus } from 'src/app/utils/types/todo-status.type'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  private _stop$: Subject<void> = new Subject();
  public todos: TODO[]
  public subscription: Subscription | null

  constructor (
    public todoService: TodoService,
    private readonly _ar: ActivatedRoute
  ) {
    this.todos = []
    this.subscription = null
  }

  ngOnDestroy(): void {
    this._stop$.complete();
  }

  ngOnInit (): void {
    this._ar.params.subscribe({
      next: ({ filter = '' }) => {
        this.getTodos(filter as TodoStatus)
      }
    })
  }

  public getTodos (filter: TodoStatus): void {
    (this.subscription?.closed !== null) && this.subscription?.unsubscribe()

    this.subscription = this.todoService.getTodosFilter(filter).subscribe({
      next: (todos) => {
        this.todos = todos
      }
    })
  }

  public updateStatus (todo: TODO): void {
    todo.completed = !todo.completed
    this.todoService.updateTodos = this.todos
  }

  public updateTodo (todo: TODO): void {
    todo.isEditing = false
    this.todoService.updateTodos = this.todos
  }

  public deleteTodo (position: number): void {
    this.todos.splice(position, 1)
    this.todoService.updateTodos = this.todos
  }

  public cancelEdit (): void {
    let cached: any[] = window.localStorage.getItem('mydayapp-angular') && JSON.parse(window.localStorage.getItem('mydayapp-angular')!);
    (cached) && (cached = this.todoService.convertToTODOS(cached))
    this.todoService.updateTodos = cached
  }

  public clearCompleted(): void {
    const uncompleted = this.todos.filter(todo => !todo.completed);
    this.todoService.updateTodos = uncompleted;
  }
}
