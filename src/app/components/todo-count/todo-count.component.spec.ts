import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TodoCountComponent } from './todo-count.component';

describe('TodoCountComponent', () => {
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

  it('should has word items with 0 quantity', () => {
    const countDebug = fixture.debugElement.query(By.css('[data-testid="todos-count"]'));
    const countEle = countDebug.nativeElement as HTMLSpanElement;
    expect(countEle.textContent).toContain('items');
  });
  it('should has word item with 1 quantity', () => {
    component.quantity = 1;
    fixture.detectChanges();
    const countDebug = fixture.debugElement.query(By.css('[data-testid="todos-count"]'));
    const countEle = countDebug.nativeElement as HTMLSpanElement;
    expect(countEle.textContent).toContain('item');
  });
  it('should has word items with 2 quantity', () => {
    component.quantity = 2;
    fixture.detectChanges();
    const countDebug = fixture.debugElement.query(By.css('[data-testid="todos-count"]'));
    const countEle = countDebug.nativeElement as HTMLSpanElement;
    expect(countEle.textContent).toContain('items');
  })
});
