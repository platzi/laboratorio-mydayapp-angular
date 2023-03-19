import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { FooterLinkComponent } from './footer-link.component';

describe('FooterLinkComponent', () => {
  let component: FooterLinkComponent;
  let fixture: ComponentFixture<FooterLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterLinkComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterLinkComponent);
    component = fixture.componentInstance;
    component.data = {
      route: '/',
      activeClass: 'selected',
      text: 'All'
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a "a" tag with text All', () => {
    const debugEle = fixture.debugElement.query(By.css('[data-testid="footer-link"]'));
    const routerLinkRef = debugEle.injector.get(RouterLinkWithHref);
    const element = debugEle.nativeElement as HTMLAnchorElement;
    expect(element.textContent).toContain('All');
    expect(routerLinkRef.href).toBe('/');
  })
});
