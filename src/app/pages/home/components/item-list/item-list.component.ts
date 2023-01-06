import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from '../../../items.interface';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: []
})
export class ItemListComponent implements OnInit {

  @Input() items: Item[] = [];

  @Output() toggleItemEvent = new EventEmitter<Item>();
  @Output() destroyItemEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleItem(item: Item, index: number): void {
    this.toggleItemEvent.emit(item);
  }

  destroyItem(index: number): void {
    this.destroyItemEvent.emit(index);
  }

}
