import { TestBed } from '@angular/core/testing';
import { TODO } from '../models/todo.model';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return only completed todos', () => {
    const mockTodos = [
      new TODO('buy food', false),
      new TODO('do homework', true),
      new TODO('buy clothes', false),
      new TODO('clean house', true),
      new TODO('wash dishes', false),
      new TODO('eat food', true),
      new TODO('study', false)
    ];
    service.updateTodos = mockTodos;
    service.getTodosFilter('completed').subscribe({
      next: (val) => {
        expect(val.length).toBe(mockTodos.filter(val => val.completed).length);
        val.forEach(todo => expect(todo.completed).toBeTruthy())
      }
    })
  });
  it('should return only pending todos', () => {
    const mockTodos = [
      new TODO('buy food', false),
      new TODO('do homework', true),
      new TODO('buy clothes', false),
      new TODO('clean house', true),
      new TODO('wash dishes', false),
      new TODO('eat food', true),
      new TODO('study', false)
    ];
    service.updateTodos = mockTodos;
    service.getTodosFilter('pending').subscribe({
      next: (val) => {
        expect(val.length).toBe(mockTodos.filter(val => !val.completed).length);
        val.forEach(todo => expect(todo.completed).toBeFalsy())
      }
    })
  });
  it('should return all todos', () => {
    const mockTodos = [
      new TODO('buy food', false),
      new TODO('do homework', true),
      new TODO('buy clothes', false),
      new TODO('clean house', true),
      new TODO('wash dishes', false),
      new TODO('eat food', true),
      new TODO('study', false)
    ];
    service.updateTodos = mockTodos;
    service.getTodosFilter('').subscribe({
      next: (val) => {
        expect(val.length).toBe(mockTodos.length);
      }
    })
  });
  it('should return todos quantity', () => {
    const mockTodos = [
      new TODO('buy food', false),
      new TODO('do homework', true),
      new TODO('buy clothes', false),
      new TODO('clean house', true),
      new TODO('wash dishes', false),
      new TODO('eat food', true),
      new TODO('study', false)
    ];
    service.updateTodos = mockTodos;
    const quantity = service.todosQuantity;
    expect(quantity).toBe(mockTodos.length);
  });
  it('should return pending todos quantity', () => {
    const mockTodos = [
      new TODO('buy food', false),
      new TODO('do homework', true),
      new TODO('buy clothes', false),
      new TODO('clean house', true),
      new TODO('wash dishes', false),
      new TODO('eat food', true),
      new TODO('study', false)
    ];
    service.updateTodos = mockTodos;
    const quantity = service.pendingTodos;
    expect(quantity).toBe(mockTodos.filter(val => !val.completed).length);
  })
  it('should return completed todos quantity', () => {
    const mockTodos = [
      new TODO('buy food', false),
      new TODO('do homework', true),
      new TODO('buy clothes', false),
      new TODO('clean house', true),
      new TODO('wash dishes', false),
      new TODO('eat food', true),
      new TODO('study', false)
    ];
    service.updateTodos = mockTodos;
    const quantity = service.completedTodos;
    expect(quantity).toBe(mockTodos.filter(val => val.completed).length);
  });
  it('should add a todo to todos list', () => {
    const spy = spyOn<any>(service, '_updateStorage');
    const todo = new TODO('any', false);
    const mockTodos = [
      new TODO('buy food', false),
      new TODO('do homework', true),
      new TODO('buy clothes', false),
      new TODO('clean house', true),
      new TODO('wash dishes', false),
      new TODO('eat food', true),
      new TODO('study', false)
    ];
    service.updateTodos = [...mockTodos];
    expect(service.todosQuantity).toBe(mockTodos.length);
    service.todos = todo;
    expect(service.todosQuantity).toBe(mockTodos.length + 1);
    expect(spy).toHaveBeenCalledTimes(2);
  });
  it('should update todo list', () => {
    // Arrange
    service.updateTodos = [];
    expect(service.todosQuantity).toBe(0);
    const mockTodos = [
      new TODO('buy food', false),
      new TODO('do homework', true),
      new TODO('buy clothes', false),
      new TODO('clean house', true),
      new TODO('wash dishes', false),
      new TODO('eat food', true),
      new TODO('study', false)
    ];
    service.updateTodos = [...mockTodos];
    expect(service.todosQuantity).toBe(7);
  });
  it('should delete a todo', () => {
    const todo = new TODO('any', false);
    const mockTodos = [
      new TODO('buy food', false),
      new TODO('do homework', true),
      new TODO('buy clothes', false),
      new TODO('clean house', true),
      new TODO('wash dishes', false),
      new TODO('eat food', true),
      new TODO('study', false)
    ];
    service.updateTodos = [...mockTodos];
    service.todos = todo;
    let todos: TODO[] = [];
    service.getTodosFilter('').subscribe({
      next: (val) => {
        todos = val;
      }
    });
    expect(todos.find(resp => resp.id === todo.id)).toBeTruthy();
    service.deleteTodo = todo.id;
    expect(todos.find(resp => resp.id === todo.id)).toBeFalsy();
  });
  it('should call removeItem', () => {
    const spyStorage = spyOn(window.localStorage, 'removeItem');
    service.clearStorage();
    expect(spyStorage).toHaveBeenCalled();
    expect(spyStorage).toHaveBeenCalledWith('mydayapp-angular')
  });
  it('should remove completed todos', () => {
    const mockTodos = [
      new TODO('buy food', false),
      new TODO('do homework', true),
      new TODO('buy clothes', false),
      new TODO('clean house', true),
      new TODO('wash dishes', false),
      new TODO('eat food', true),
      new TODO('study', false)
    ];
    service.updateTodos = [...mockTodos];
    expect(service.todosQuantity).toBe(mockTodos.length);
    service.removeCompletedTodos();
    expect(service.todosQuantity).toBe(mockTodos.filter(todo => !todo.completed).length)
  })
});
