import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGenericComponent } from './input-generic.component';

describe('InputGenericComponent', () => {
  let component: InputGenericComponent;
  let fixture: ComponentFixture<InputGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputGenericComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
