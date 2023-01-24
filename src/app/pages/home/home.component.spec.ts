import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { TodosService } from 'src/app/services/todos-service.service';
import { getById } from 'src/app/testing';

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
    ]);
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HomeComponent],
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
    })
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
    })
  });

});
