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
    const task = this.li.nativeElement.classList as DOMTokenList;
    if(this.currentUrl === '/completed' && !task.contains('completed')){
      task.add('task-hidden');
    }
    if(this.currentUrl === '/pending' && task.contains('completed')){
      task.add('task-hidden');
    }
  }
}
