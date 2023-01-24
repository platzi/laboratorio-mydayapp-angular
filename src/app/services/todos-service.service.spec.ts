import { TestBed } from '@angular/core/testing';
import { Todo } from '../pages/home/todo.model';
import { LocalStorageService } from './local-storage.service';

import { TodosService } from './todos-service.service';

describe('TodosService', () => {
  let service: TodosService;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  const localStorageKey = 'mydayapp-angular';

  beforeEach(() => {
    const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'getItems',
      'setItems',
    ]);
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
      ],
    });
    service = TestBed.inject(TodosService);
    localStorageService = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  it('Test 1: should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test 2: load todos from local storage service', () => {
    localStorageService.getItems.and.returnValue([]);

    service.loadTodosFromLocalStorage();

    expect(localStorageService.getItems).toHaveBeenCalled();
    expect(localStorageService.getItems).toHaveBeenCalledWith(localStorageKey);
  });

  it('Test 3: create new todo', (doneFn) => {
    localStorageService.setItems.and.callFake(
      (localStorageKey: string, items) => {
        const todos = items as unknown as Todo[];
        expect(todos[0].title).toEqual('title');
        expect(todos[0].completed).toEqual(false);
      }
    );
    const todo: Todo = {
      title: 'title',
    };

    service.addNewTodo(todo);
    expect(localStorageService.setItems).toHaveBeenCalled();
    service.getTodos('all').subscribe((todos) => {
      expect(todos.length).toBe(1);
      expect(todos[0].title).toEqual('title');
      expect(todos[0].completed).toEqual(false);
      doneFn();
    });
  });

  it('Test 4: update todo title', (doneFn) => {
    const todoId = 'asd123';
    const newTitle = 'new title';
    localStorageService.getItems.and.returnValue([
      {
        id: todoId,
        title: 'Title',
        completed: false,
      },
    ]);
    localStorageService.setItems.and.callFake;

    service.loadTodosFromLocalStorage();
    service.updateTodoTitle(todoId, newTitle);

    service.getTodos('all').subscribe((todos) => {
      expect(todos[0].title).toEqual(newTitle);
      expect(localStorageService.setItems).toHaveBeenCalled();
      doneFn();
    });
  });

  it('Test 5: toggle todo completed status', (doneFn) => {
    const todoId = 'asd123';
    localStorageService.getItems.and.returnValue([
      {
        id: todoId,
        title: 'Title',
        completed: false,
      },
    ]);
    localStorageService.setItems.and.callFake;

    service.loadTodosFromLocalStorage();
    service.toggleTodoCompletedStatus(todoId);

    service.getTodos('all').subscribe((todos) => {
      expect(todos[0].completed).toEqual(true);
      expect(localStorageService.setItems).toHaveBeenCalled();
      doneFn();
    });
  });

  it('Test 6: remove todo', (doneFn) => {
    const todoTargetId = 'asd123';
    localStorageService.getItems.and.returnValue([
      {
        id: 'abc123',
        title: 'Title',
        completed: false,
      },
      {
        id: todoTargetId,
        title: 'Title 2',
        completed: true,
      },
    ]);
    localStorageService.setItems.and.callFake((localStorageKey, items) => {
      const todos = items as unknown as Todo[];
      expect(todos.length).toBe(1);
    });

    service.loadTodosFromLocalStorage();
    service.removeTodo(todoTargetId);

    service.getTodos('all').subscribe((todos) => {
      const todoIndex = todos.findIndex((t) => t.id === todoTargetId);
      expect(todos.length).toBe(1);
      expect(localStorageService.setItems).toHaveBeenCalled();
      expect(todoIndex).toBe(-1);
      doneFn();
    });
  });

  it('Test 7: filter by completed', (doneFn) => {
    localStorageService.getItems.and.returnValue([
      {
        id: 'abc123',
        title: 'Title',
        completed: false,
      },
      {
        id: 'abc1234',
        title: 'Title 2',
        completed: false,
      },
      {
        id: 'asdnbd123',
        title: 'Title 3',
        completed: true,
      },
      {
        id: 'asd123098',
        title: 'Title 4',
        completed: true,
      },
    ]);

    service.loadTodosFromLocalStorage();
    service.getTodos('completed').subscribe((todos) => {
      const isOnlyCompleted = todos
        .filter((t) => t.completed === true)
        .every((t) => t.completed === true);

      expect(isOnlyCompleted).toBeTruthy();
      doneFn();
    });
  });

  it('Test 7: filter by pending', (doneFn) => {
    localStorageService.getItems.and.returnValue([
      {
        id: 'abc123',
        title: 'Title',
        completed: false,
      },
      {
        id: 'abc1234',
        title: 'Title 2',
        completed: false,
      },
      {
        id: 'asdnbd123',
        title: 'Title 3',
        completed: true,
      },
      {
        id: 'asd123098',
        title: 'Title 4',
        completed: true,
      },
    ]);

    service.loadTodosFromLocalStorage();
    service.getTodos('pending').subscribe((todos) => {
      const isOnlyPending = todos
        .filter((t) => t.completed === false)
        .every((t) => t.completed === false);

      expect(isOnlyPending).toBeTruthy();
      doneFn();
    });
  });
});
