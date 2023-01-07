import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
})
export class PendingComponent implements OnDestroy {


  ngOnDestroy(): void {
    location.reload();
  }



}
