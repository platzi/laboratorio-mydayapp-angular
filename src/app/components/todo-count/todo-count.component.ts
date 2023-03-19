import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-count',
  templateUrl: './todo-count.component.html',
  styles: []
})
export class TodoCountComponent {

  public itemsMapping: Record<string, string>;

  @Input() quantity: number = 0;

  constructor() {
    this.itemsMapping = {'=0': 'items', '=1': 'item', 'other': 'items'};
  }
}
