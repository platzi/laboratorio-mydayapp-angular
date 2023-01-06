import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CategoryFilter } from '../../../../shared/category-filter.type';
import { Item } from '../../../../shared/items.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent {

  public items: Item[] = [];

  public itemsLeft = 0;
  public itemsDone = 0;

  public filterSelected: CategoryFilter = 'all';

  @Input() set setItems(items: Item[]) {
    this.buildItemsInformation(items);
  }

  constructor() { }

  buildItemsInformation(items: Item[]): void {
    this.items = items;
    this.itemsLeft = 0;
    this.itemsDone = 0;
    this.items.forEach((i: Item) => {
      if (i.done) this.itemsDone++;
      else this.itemsLeft++;
    });
  }

  seeAllItems(): void {
    this.filterSelected = 'all';
  }

  seeItemsPendings(): void {
    this.filterSelected = 'pending';
  }

  seeItemsCompleted(): void {
    this.filterSelected = 'completed';
  }

  clearItemsCompleted(): void {

  }

}
