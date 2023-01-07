import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  @Input()pendingTasks: number = 0
  @Input()canClear: Boolean = false
  @Output()clearCompleted = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClearCompleted(){
    this.clearCompleted.emit()
  }

}
