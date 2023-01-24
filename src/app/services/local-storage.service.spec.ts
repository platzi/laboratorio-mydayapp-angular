import { TestBed } from '@angular/core/testing';
import { Todo } from '../pages/home/todo.model';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  const localStorageKey = 'mydayapp-angular';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Set item', () => {
    const spy = spyOn(localStorage, 'setItem');
    const todos: Todo[] = [
      {
        id: 'id1',
        title: 'Title',
        completed: false,
      }
    ];
    service.setItems<Todo[]>(localStorageKey, todos);
    expect(spy).toHaveBeenCalled();
  });

  it('Get item', () => {
    const todos: Todo[] = [
      {
        id: 'id1',
        title: 'Title',
        completed: false,
      }
    ];

    const spy = spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(todos));

    const results = service.getItems<Todo[]>(localStorageKey);

    expect(spy).toHaveBeenCalled();
    expect(results).toEqual(todos);
  });
});
