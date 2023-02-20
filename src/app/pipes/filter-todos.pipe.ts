import { Pipe, PipeTransform } from '@angular/core';
import { Todo, todoFilter } from '../models/todo.model';

@Pipe({
  name: 'filterTodos'
})
export class FilterTodosPipe implements PipeTransform {

  transform(todos: Todo[], filter: todoFilter): Todo[] {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'pending':
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }

}
