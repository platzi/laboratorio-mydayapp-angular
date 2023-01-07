import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryFilter } from '../../../../shared/category-filter.type';
import { Item } from '../../../../shared/items.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent {

  @Output() clearCompletedEvent = new EventEmitter<boolean>();

  @Input() filterSelected: CategoryFilter = 'all';

  @Input() set setItems(items: Item[]) {
    this.items = items;
    this.buildItemsInformation();
  }

  public items: Item[] = [];

  public itemsLeft = 0;
  public itemsDone = 0;

  constructor(
    private router: Router,
  ) { }

  buildItemsInformation(): void {
    this.itemsLeft = 0;
    this.itemsDone = 0;
    this.items.forEach((i: Item) => {
      if (i.completed) this.itemsDone++;
      else this.itemsLeft++;
    });
  }

  changeFilter(filter: CategoryFilter): void {
    this.filterSelected = filter;
    this.router.navigate([`/${filter}`]);
    this.buildItemsInformation();
  }

  clearItemsCompleted(): void {
    this.clearCompletedEvent.emit(true);
  }

}
