import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { getById } from 'src/app/testing';

import { TodoElementComponent } from './todo-element.component';

describe('TodoElementComponent', () => {
  let component: TodoElementComponent;
  let fixture: ComponentFixture<TodoElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Test 1: should create', (doneFn) => {
    component.todo = {
      id: 'id123',
      title: 'Title',
      completed: false,
    };

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
      doneFn();
    })
  });

  it('Test 2: mark task as completed', fakeAsync(() => {
    const emit = spyOn(component.updateCompletedStatus, 'emit');
    component.todo = {
      id: 'id123',
      title: 'Title',
      completed: false,
    };

    fixture.detectChanges();
    tick();

    let todo = getById(fixture, 'todo').nativeElement as HTMLElement;
    const toggle = getById(fixture, 'toggle').nativeElement as HTMLElement;

    expect(todo.classList.contains('completed')).toBeFalsy();

    toggle.click();

    fixture.detectChanges();
    tick();

    todo = getById(fixture, 'todo').nativeElement as HTMLElement;

    expect(todo.classList.contains('completed')).toBeTruthy();
    expect(component.todo.completed).toBeTruthy();
    expect(emit).toHaveBeenCalled();
  }));

  it('Test 3: mark task as pending', fakeAsync(() => {
    const emit = spyOn(component.updateCompletedStatus, 'emit');
    component.todo = {
      id: 'id123',
      title: 'Title',
      completed: true,
    };

    fixture.detectChanges();
    tick();

    let todo = getById(fixture, 'todo').nativeElement as HTMLElement;
    const toggle = getById(fixture, 'toggle').nativeElement as HTMLElement;

    expect(todo.classList.contains('completed')).toBeTruthy();

    toggle.click();

    fixture.detectChanges();
    tick();

    todo = getById(fixture, 'todo').nativeElement as HTMLElement;

    expect(todo.classList.contains('completed')).toBeFalsy();
    expect(component.todo.completed).toBeFalsy();
    expect(emit).toHaveBeenCalled();
  }));

  it('Test 4: edit mode: enter and exit', fakeAsync(() => {
    component.todo = {
      id: 'id123',
      title: 'Title',
      completed: true,
    };

    fixture.detectChanges();
    tick();

    const label = getById(fixture, 'label');
    label.triggerEventHandler('dblclick', new MouseEvent('dblclick'))

    fixture.detectChanges();
    tick();

    let todo = getById(fixture, 'todo').nativeElement as HTMLElement;

    expect(todo.classList.contains('editing')).toBeTrue();
    expect(component.isEditMode).toBeTrue();


    const editInput = getById(fixture, 'edit-input').nativeElement as HTMLInputElement;
    editInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape', bubbles: true }));

    fixture.detectChanges();
    tick();

    todo = getById(fixture, 'todo').nativeElement as HTMLElement;

    expect(component.isEditMode).toBeFalse();
    expect(todo.classList.contains('editing')).toBeFalse();
  }));

  it('Test 5: edit todo title', fakeAsync(() => {
    const spy = spyOn(component.updateTodoTitle, 'emit');
    component.todo = {
      id: 'id123',
      title: 'Title',
      completed: true,
    };
    component.isEditMode = true;

    fixture.detectChanges();
    tick();

    const editInput = getById(fixture, 'edit-input').nativeElement as HTMLInputElement;
    editInput.value = '   New Title   ';
    editInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));

    fixture.detectChanges();
    tick();

    const todo = getById(fixture, 'todo').nativeElement as HTMLElement;
    const label = getById(fixture, 'label').nativeElement as HTMLElement;

    expect(component.isEditMode).toBeFalse();
    expect(spy).toHaveBeenCalledWith('New Title');
    expect(todo.classList.contains('editing')).toBeFalse();
    expect(label.textContent).toEqual('New Title');
  }));
});
