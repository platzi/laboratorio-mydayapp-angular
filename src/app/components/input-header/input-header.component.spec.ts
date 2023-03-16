import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputHeaderComponent } from './input-header.component';

describe('InputHeaderComponent', () => {
  let component: InputHeaderComponent;
  let fixture: ComponentFixture<InputHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
