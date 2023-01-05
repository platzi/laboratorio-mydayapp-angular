import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChoresComponent } from './list-chores.component';

describe('ListChoresComponent', () => {
  let component: ListChoresComponent;
  let fixture: ComponentFixture<ListChoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
