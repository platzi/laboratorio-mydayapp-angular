import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent  {

  @Input()pendingTasks: number = 0
  @Input()canClear: Boolean = false
  @Output()clearCompleted = new EventEmitter()

  constructor() { }

  onClearCompleted(){
    this.clearCompleted.emit()
  }

}
