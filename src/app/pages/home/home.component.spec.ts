import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { AppModule } from "src/app/app.module";
import { TODO } from "src/app/models/todo.model";
import { TodoService } from "src/app/services/todo.service";
import { ActivatedRouteStub } from "src/testing/activatedRouteStub";
import { HomeComponent } from "./home.component";

describe('test for home component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let ar: ActivatedRouteStub;
  let todoService: jasmine.SpyObj<TodoService>
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TodoService', ['getTodosFilter','todosQuantity'])
    const routeStub = new ActivatedRouteStub();
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: routeStub
        },
        {
          provide: TodoService,
          useValue: spy
        }
      ],
      imports: [
        AppModule
      ]
    }).compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    ar = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    component = fixture.componentInstance;
    const mockTodos = [
      new TODO('buy food', false),
      new TODO('do homework', true),
      new TODO('buy clothes', false),
      new TODO('clean house', true),
      new TODO('wash dishes', false),
      new TODO('eat food', true),
      new TODO('study', false)
    ];
    ar.setParams({filter: ''});
    todoService.getTodosFilter.and.returnValue(of(mockTodos));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
})
