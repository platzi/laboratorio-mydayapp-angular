import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { FooterComponent } from './footer.component';

class TodoServiceMock {
  private _todos: any;

  get todos() {
    return of()
  }

  set todos(value: any) {
    this._todos = value;
  }

  get pendingTodos() {
    return 2
  }
  get completedTodos() {
    return 2
  }
}

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      providers: [
        {
          provide: TodoService,
          useValue: TodoServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 links', () => {
    expect(component.routes.length).toBe(3)
  });

  it('should render 3 links', () => {
    const links = fixture.debugElement.queryAll(By.css('app-footer-link'));
    expect(links.length).toBe(component.routes.length);
  })
});
