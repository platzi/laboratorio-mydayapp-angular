import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../../../shared/items.interface';

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

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  editItem(item: Item, index: number): void {

  }

  toggleItem(index: number): void {
    this.toggleItemEvent.emit(index);
  }

  destroyItem(index: number): void {
    this.destroyItemEvent.emit(index);
  }

}
