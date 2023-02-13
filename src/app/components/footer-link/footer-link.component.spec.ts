import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterLinkComponent } from './footer-link.component';

xdescribe('FooterLinkComponent', () => {
  let component: FooterLinkComponent;
  let fixture: ComponentFixture<FooterLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
