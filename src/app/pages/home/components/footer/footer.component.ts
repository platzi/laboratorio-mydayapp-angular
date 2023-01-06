import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { CategoryFilter } from '../../../../shared/category-filter.type';
import { Item } from '../../../../shared/items.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent {

  @Output() changeFilterEvent = new EventEmitter<CategoryFilter>();

  @Input() set setItems(items: Item[]) {
    this.items = items;
    this.buildItemsInformation();
  }

  public items: Item[] = [];

  public itemsLeft = 0;
  public itemsDone = 0;

  public filterSelected: CategoryFilter = 'all';

  constructor(
    private location: Location,
  ) { }

  buildItemsInformation(): void {
    this.itemsLeft = 0;
    this.itemsDone = 0;
    this.items.forEach((i: Item) => {
      if (i.done) this.itemsDone++;
      else this.itemsLeft++;
    });
  }

  changeFilter(filter: CategoryFilter): void {
    this.filterSelected = filter;
    this.changeFilterEvent.emit(filter);
    this.location.go(`/${filter}`);
    this.buildItemsInformation();
  }

  clearItemsCompleted(): void {

  }

}
