import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCountComponent } from './todo-count.component';

xdescribe('TodoCountComponent', () => {
  let component: TodoCountComponent;
  let fixture: ComponentFixture<TodoCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
