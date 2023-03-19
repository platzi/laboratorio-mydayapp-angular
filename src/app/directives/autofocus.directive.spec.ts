import { ElementRef } from '@angular/core';
import { AutofocusDirective } from './autofocus.directive';

describe('AutofocusDirective', () => {
  let elementRef: ElementRef<HTMLParagraphElement>;
  beforeEach(() => {
    const element: HTMLParagraphElement = document.createElement('p');
    element.innerText = 'hello';
    elementRef = new ElementRef(element);

  })
  it('should create an instance', () => {
    const directive = new AutofocusDirective(elementRef);
    directive.ngOnInit();
    expect(directive).toBeTruthy();
  });
});
