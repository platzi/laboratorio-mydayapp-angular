import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TODO } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { CreateTodoComponent } from './create-todo.component';

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;
  let todoServiceInstance: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTodoComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
    todoServiceInstance  = new TodoService();
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
    let debugElement = fixture.debugElement.query(By.css('[data-testid="create-todo-input"]'));
    let element: HTMLInputElement = debugElement.nativeElement;
    const inputValue = 'Buy food';
    element.value = inputValue;
    // Trigger the event
    debugElement.triggerEventHandler('input',{
      target: element
    });
    fixture.detectChanges();

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


  // it('should create a TODO and call "todos" 1 time', () => {
  //   const inputValue = 'Buy food';
  //   spyOnProperty(todoServiceInstance, 'todos','set').and.callThrough();
  //   spyOn()
  //   let debugElement = fixture.debugElement.query(By.css('[data-testid="create-todo-input"]'));
  //   let element: HTMLInputElement = debugElement.nativeElement;
  //   element.value = inputValue;

  //   element.dispatchEvent(new Event('input'))
  //   element.dispatchEvent(new Event('keyup.enter'));

  //   expect(todoServiceInstance.todos).toHaveBeenCalledTimes(1)
  // });
});
