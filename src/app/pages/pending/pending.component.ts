import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
})
export class PendingComponent implements OnInit, OnDestroy {

  constructor() { }
  ngOnDestroy(): void {
    location.reload();
  }

  ngOnInit(): void {
  }

}
