import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appFilter]'
})
export class FilterDirective implements AfterViewInit{
  currentUrl!: string;

  constructor(
    private li: ElementRef,
    private router: Router
  ){
    this.currentUrl = this.router.url;
  }

  ngAfterViewInit(): void {
    const isCompleted = this.li.nativeElement.classList as DOMTokenList;
    console.log(isCompleted.contains('completed'));
    console.log(this.currentUrl);
  }
}
