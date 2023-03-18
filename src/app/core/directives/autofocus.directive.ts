import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[Autofocus]'
})
export class AutofocusDirective implements AfterViewInit{

  constructor(private host: ElementRef) { }

  ngAfterViewInit() {
    this.host.nativeElement.focus();
  }

}
