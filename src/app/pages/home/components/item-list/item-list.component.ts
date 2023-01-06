import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../../items.interface';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: []
})
export class ItemListComponent {

  @Input() items: Item[] = [];

  @Output() editItemEvent = new EventEmitter<Item>();
  @Output() toggleItemEvent = new EventEmitter<number>();
  @Output() destroyItemEvent = new EventEmitter<number>();

  constructor() { }

  editItem(item: Item): void {

  }

  toggleItem(index: number): void {
    this.toggleItemEvent.emit(index);
  }

  destroyItem(index: number): void {
    this.destroyItemEvent.emit(index);
  }

}
