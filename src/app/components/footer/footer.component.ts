import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Todo } from "../../models/todo.model";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  @Input() completed: number = 0;
  @Input() todos: Todo[] = [];
  @Input() length: number = 0;
  @Output() clearCompleted = new EventEmitter();
  @Input() filter: string = '';
  constructor(
  ) {
  }


  ngOnInit() {
  }

  clearComplete(){
    this.clearCompleted.emit();
  }

}
