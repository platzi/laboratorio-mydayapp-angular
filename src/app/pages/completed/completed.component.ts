import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
})
export class CompletedComponent implements OnInit, OnDestroy {

  constructor() { }
  ngOnDestroy(): void {
    location.reload();
  }


  ngOnInit(): void {
  }

}
