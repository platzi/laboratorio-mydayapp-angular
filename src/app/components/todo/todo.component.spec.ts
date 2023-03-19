import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { map } from 'rxjs';
import { TODO } from 'src/app/models/todo.model';

import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoComponent ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
  }))
  it('should create', () => {
    component.todo = new TODO('buy food', false);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should not render data if todo data is empty', () => {
    fixture.detectChanges();
    const debugEle = fixture.debugElement.query(By.css('[data-testid="todo"]'));
    expect(debugEle).not.toBeTruthy()
  });
  it('should have class completed', () => {
    component.todo = new TODO('buy food', true);
    fixture.detectChanges();
    const debugEle = fixture.debugElement.query(By.css('[data-testid="todo"]'));
    const element = debugEle.nativeElement as HTMLLIElement;
    expect(element.classList.contains('completed')).toBeTruthy();
  });
  it('should not have class completed', () => {
    component.todo = new TODO('buy food', false);
    fixture.detectChanges();
    const debugEle = fixture.debugElement.query(By.css('[data-testid="todo"]'));
    const element = debugEle.nativeElement as HTMLLIElement;
    expect(element.classList.contains('completed')).toBeFalsy();
  });
  it('should have class editing when dblclick and display input', () => {
    // Arrange
    component.todo = new TODO('buy food', false);
    fixture.detectChanges();
    const debugEleLabel = fixture.debugElement.query(By.css('[data-testid="edit-todo-label"]'));
    debugEleLabel.triggerEventHandler('dblclick', null);
    fixture.detectChanges();
    expect(component.todo.isEditing).toBeTrue();

    const debugEleInput = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]'));
    expect(debugEleInput).toBeTruthy();
    const debugEleTodo = fixture.debugElement.query(By.css('[data-testid="todo"]'));
    const eleTodo = debugEleTodo.nativeElement as HTMLLIElement;
    expect(eleTodo.classList.contains('editing')).toBeTrue();
  });
  it('should emit cancelEdit event', () => {
    component.todo = new TODO('buy food', false);
    component.cancelEdit.pipe(
      map(() => true)
    ).subscribe({
      next: (val) => {
        expect(val).toBeTrue()
      }
    })

    fixture.detectChanges();
    const debugEleLabel = fixture.debugElement.query(By.css('[data-testid="edit-todo-label"]'));
    debugEleLabel.triggerEventHandler('dblclick', null);
    fixture.detectChanges();
    const debugTodo = fixture.debugElement.query(By.css('[data-testid="todo"]'));
    debugTodo.triggerEventHandler('keyup.escape', null);
  });
  it('should toggle completed status and fires updateStatus', fakeAsync(() => {
    component.todo = new TODO('buy food', false);
    component.updateStatus.pipe(map(() => true)).subscribe({
      next: (val) => {
        expect(val).toBeTrue()
      }
    });
    fixture.detectChanges();
    tick();
    const checkboxDeb = fixture.debugElement.query(By.css('[data-testid="edit-todo-checkbox"]'));
    const checkboxEle = checkboxDeb.nativeElement as HTMLInputElement;
    checkboxEle.checked = true;
    checkboxEle.dispatchEvent(new Event('change'));
    fixture.detectChanges()
    tick();
  }));
  it('should emit deleteTodo', () => {
    component.todo = new TODO('buy food', false);
    component.deleteTodo.pipe(map(() => true)).subscribe({
      next: (val) => {
        expect(val).toBeTrue()
      }
    });
    fixture.detectChanges();
    const btnDebug = fixture.debugElement.query(By.css('[data-testid="edit-todo-delete"]'));
    btnDebug.triggerEventHandler('click');
    fixture.detectChanges();
  });
  it('should emit updateTodo', () => {
     // Arrange
     component.todo = new TODO('buy food', false);
     component.updateTodo.pipe(map(() => true)).subscribe({
       next: (val) => {
         expect(val).toBeTrue()
       }
     });
    fixture.detectChanges();
    const debugEleLabel = fixture.debugElement.query(By.css('[data-testid="edit-todo-label"]'));
    debugEleLabel.triggerEventHandler('dblclick', null);
    fixture.detectChanges();
    const btnDebug = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]'));
    btnDebug.triggerEventHandler('keyup.enter');
    fixture.detectChanges();
  });
  it('should has autofocus when change to update', () => {
    component.todo = new TODO('buy food', false);
    fixture.detectChanges();
    const debugEleLabel = fixture.debugElement.query(By.css('[data-testid="edit-todo-label"]'));
    debugEleLabel.triggerEventHandler('dblclick', null);
    fixture.detectChanges();
    const inputDebug = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]'));
    const inputEle = inputDebug.nativeElement as HTMLInputElement;
    expect(inputEle.getAttribute('autofocus')).toBe('');
  })
});
