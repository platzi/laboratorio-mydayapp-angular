import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TODO } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { CreateTodoComponent } from './create-todo.component';

class TodoServiceMock {
  private _todos: any;

  get todos() {
    return of()
  }

  set todos(value: any) {
    this._todos = value;
  }
}

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;
  let todoService: TodoService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTodoComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: TodoService,
          useClass: TodoServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render and input with placeholder "Type new todo"', () => {
    let debugElement = fixture.debugElement.query(By.css('[data-testid="create-todo-input"]'));
    let element: HTMLInputElement = debugElement.nativeElement;

    expect(element).toBeTruthy();
    expect(element.getAttribute('placeholder')).toBe('Type new todo')
  });
  it('should update form control when write in the ui', () => {
    // Arrange
    const inputValue = 'Buy food';
    let debugElement = fixture.debugElement.query(By.css('[data-testid="create-todo-input"]'));
    let element: HTMLInputElement = debugElement.nativeElement;
    // Act

    element.value = inputValue;
    // Trigger the event
    debugElement.triggerEventHandler('input',{
      target: element
    });
    fixture.detectChanges();
    // Assert
    expect(component.newTodoDescription.value).toBe(inputValue);
  });
  it('should have autofocus', () => {
    let debugElement = fixture.debugElement.query(By.css('[data-testid="create-todo-input"]'));
    let element: HTMLInputElement = debugElement.nativeElement;
    expect(element.getAttribute('autofocus')).toBe("")
  });
  it('should call createTodo when press enter', () => {
    spyOn(component,'createTodo').and.callThrough()
    let debugElement = fixture.debugElement.query(By.css('[data-testid="create-todo-input"]'));
    debugElement.triggerEventHandler('keyup.enter');
    expect(component.createTodo).toHaveBeenCalled();
  });
  it('should call createTodo with empty string', () => {
    spyOn(component,'createTodo').and.callThrough()
    let debugElement = fixture.debugElement.query(By.css('[data-testid="create-todo-input"]'));
    debugElement.triggerEventHandler('keyup.enter');
    expect(component.createTodo).toHaveBeenCalledWith('');
  });
  it('should call createTodo with "Buy food"', () => {
    spyOn(component,'createTodo').and.callThrough()
    let debugElement = fixture.debugElement.query(By.css('[data-testid="create-todo-input"]'));
    let element: HTMLInputElement = debugElement.nativeElement;
    const inputValue = 'Buy food';
    element.value = inputValue;
    // Trigger the event
    debugElement.triggerEventHandler('input',{
      target: element
    });
    fixture.detectChanges();
    debugElement.triggerEventHandler('keyup.enter');
    expect(component.createTodo).toHaveBeenCalledWith(inputValue);
  });


  it('should create a TODO and call "todos" 1 time', () => {
    // Arrange
    const inputValue = 'Buy food';
    const todos = spyOnProperty(todoService, 'todos','set').and.callThrough();
    spyOn(fixture.componentInstance,'createTodo').and.callThrough()
    let debugElement = fixture.debugElement.query(By.css('[data-testid="create-todo-input"]'));
    let element: HTMLInputElement = debugElement.nativeElement;
    // Act
    element.value = inputValue;
    element.dispatchEvent(new Event('input'))
    element.dispatchEvent(new KeyboardEvent('keyup', {key: 'enter'}));
    fixture.detectChanges();
    // Assert
    expect(component.createTodo).toHaveBeenCalledTimes(1);
    expect(component.createTodo).toHaveBeenCalledWith(inputValue);
    expect(todos).toHaveBeenCalledTimes(1);
  });
});
