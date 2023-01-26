import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { TodosService } from 'src/app/services/todos-service.service';
import { getAllById, getById } from 'src/app/testing';
import { Component, Input } from '@angular/core';
import { Todo } from './todo.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-todo-element',
})
class AppTodoElementComponent {
  @Input() todo!: Todo;
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let todosService: jasmine.SpyObj<TodosService>;

  beforeEach(async () => {
    const todosServiceSpy = jasmine.createSpyObj('TodosService', [
      'loadTodosFromLocalStorage',
      'addNewTodo',
      'getTodos',
      'updateTodoTitle',
      'toggleTodoCompletedStatus',
      'removeTodo',
      'clearCompletedTodos',
    ]);
    await TestBed.configureTestingModule({
      imports: [FormsModule, AppRoutingModule],
      declarations: [HomeComponent, AppTodoElementComponent],
      providers: [
        {
          provide: TodosService,
          useValue: todosServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    todosService = TestBed.inject(TodosService) as jasmine.SpyObj<TodosService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Test 1: should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test 2: hide main and footer', () => {
    todosService.getTodos.and.returnValue(of([]));
    const main = getById(fixture, 'main');
    const footer = getById(fixture, 'footer');

    expect(main).toBeFalsy();
    expect(footer).toBeFalsy();
  });

  it('Test 3: add new todo from main input', (doneFn) => {
    todosService.addNewTodo.and.callFake;
    const debugInput = getById(fixture, 'add-todo-input');
    const htmlInput = debugInput.nativeElement as HTMLInputElement;
    const todoTitle = '   New Todo   ';
    htmlInput.value = todoTitle;
    htmlInput.dispatchEvent(new Event('input', { bubbles: true }));
    htmlInput.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter', bubbles: true })
    );
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(todosService.addNewTodo).toHaveBeenCalled();
      expect(todosService.addNewTodo).toHaveBeenCalledWith(todoTitle.trim());
      expect(component.todoInput).toEqual('');
      doneFn();
    });
  });

  it('Test 4: do not create todo if input is empty', (doneFn) => {
    todosService.addNewTodo.and.callFake;
    const debugInput = getById(fixture, 'add-todo-input');
    const htmlInput = debugInput.nativeElement as HTMLInputElement;
    const todoTitle = '    ';
    htmlInput.value = todoTitle;
    htmlInput.dispatchEvent(new Event('input', { bubbles: true }));
    htmlInput.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter', bubbles: true })
    );
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(todosService.addNewTodo).not.toHaveBeenCalled();
      doneFn();
    });
  });

  it('Test 5: show number of pending todos in the right format', fakeAsync(() => {
    todosService.loadTodosFromLocalStorage.and.callFake;
    todosService.getTodos.and.returnValue(
      of([
        {
          id: 'id1',
          title: 'title 1',
          completed: false,
        },
        {
          id: 'id2',
          title: 'title 2',
          completed: true,
        },
        {
          id: 'id3',
          title: 'title 3',
          completed: false,
        },
        {
          id: 'id4',
          title: 'title 4',
          completed: true,
        },
      ])
    );

    component.ngOnInit();
    fixture.detectChanges();
    tick();

    let counter = getById(fixture, 'todo-counter').nativeElement as HTMLElement;

    expect(counter.textContent).toContain('2 items');

    todosService.getTodos.and.returnValue(
      of([
        {
          id: 'id1',
          title: 'title 1',
          completed: false,
        },
      ])
    );

    component.ngOnInit();
    fixture.detectChanges();
    tick();

    counter = getById(fixture, 'todo-counter').nativeElement as HTMLElement;

    expect(counter.textContent).toContain('1 item');
  }));

  it('Test 6: clear button must be hidden when there are no completed todos', fakeAsync(() => {
    todosService.getTodos.and.returnValue(
      of([
        {
          id: 'id1',
          title: 'title 1',
          completed: false,
        },
        {
          id: 'id2',
          title: 'title 2',
          completed: false,
        },
      ])
    );

    component.ngOnInit();
    fixture.detectChanges();
    tick();

    const clearButton = getById(fixture, 'clear-button');

    expect(clearButton).toBeFalsy();
  }));
});

describe('HomeComponent: integration', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, AppRoutingModule],
      declarations: [HomeComponent, AppTodoElementComponent],
      providers: [TodosService, LocalStorageService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Test 1: Should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Test 2: clear completed todos', fakeAsync(() => {
    const arr = JSON.stringify([
      {
        id: 'id1',
        title: 'title 1',
        completed: false,
      },
      {
        id: 'id2',
        title: 'title 2',
        completed: true,
      },
      {
        id: 'id3',
        title: 'title 3',
        completed: false,
      },
      {
        id: 'id4',
        title: 'title 4',
        completed: true,
      },
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(arr);

    component.ngOnInit();
    fixture.detectChanges();
    tick();

    let todoElements = getAllById(fixture, 'todo-element');
    const clearButton = getById(fixture, 'clear-button')
      .nativeElement as HTMLButtonElement;

    expect(todoElements.length).toEqual(4);

    clearButton.click();

    fixture.detectChanges();
    tick();

    todoElements = getAllById(fixture, 'todo-element');
    expect(todoElements.length).toEqual(2);
  }));
});
