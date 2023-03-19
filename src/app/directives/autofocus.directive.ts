import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit{

  constructor(
    private _el: ElementRef
  ) { }

  ngOnInit(): void {
    (<HTMLElement>this._el.nativeElement).focus()
  }

}
