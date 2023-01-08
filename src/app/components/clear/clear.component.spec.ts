import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearComponent } from './clear.component';

describe('ClearComponent', () => {
  let component: ClearComponent;
  let fixture: ComponentFixture<ClearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
