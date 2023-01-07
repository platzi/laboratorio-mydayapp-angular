import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  @Input()pendingTasks: number = 0
  @Input()canClear: Boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
