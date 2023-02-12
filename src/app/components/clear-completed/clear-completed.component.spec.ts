import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoService } from 'src/app/services/todo.service';

import { ClearCompletedComponent } from './clear-completed.component';

fdescribe('ClearCompletedComponent', () => {
  let component: ClearCompletedComponent;
  let fixture: ComponentFixture<ClearCompletedComponent>;
  let todoService: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    const todoServiceSpy = jasmine.createSpyObj('TodoService', ['removeCompletedTodos']);
    await TestBed.configureTestingModule({
      declarations: [ ClearCompletedComponent ],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearCompletedComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a btn with text "clear completed"', () => {
    const debugElement = fixture.debugElement.query(By.css('[data-testid="clear-completed-btn"]'));
    const element: HTMLButtonElement = debugElement.nativeElement;
    expect(element).toBeTruthy();
    expect(element.innerText).toBe('Clear completed')
  });

  it('should call removeCompletedTodos function', () => {
    const debugElement = fixture.debugElement.query(By.css('[data-testid="clear-completed-btn"]'));

    debugElement.triggerEventHandler('click');

    expect(todoService.removeCompletedTodos).toHaveBeenCalled();
  })
});
