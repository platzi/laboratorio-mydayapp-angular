import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsStorageService } from '../../shared/services/items-storage.service';
import { CategoryFilter } from '../../shared/category-filter.type';
import { Item, ItemEdited } from '../../shared/items.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public items: Item[] = [];
  public itemsBackup: Item[] = [];

  public filterSelected: CategoryFilter = 'all';

  constructor(
    private route: ActivatedRoute,
    private storage: ItemsStorageService,
  ) { }

  ngOnInit(): void {
    this.itemsBackup = this.storage.get();
    this.route.params
      .subscribe(p => {
        this.filterSelected = p['filter'] || 'all';
        this.changeFilter();
      })
  }

  addItem(title: string): void {
    this.items = this.itemsBackup.concat({
      title: title.trim(),
      completed: false
    });
    this.setBackup();
  }

  editItem(item: ItemEdited): void {
    this.items = this.itemsBackup.map((i: Item, j: number) => {
      if (j == item.id) return { title: item.title, completed: item.completed }
      else return i;
    });
    this.setBackup();
  }

  toggleItem(index: number): void {
    this.items = this.itemsBackup.map((i: Item, j: number) => {
      if (j == index) return { title: i.title, completed: !i.completed }      // Change title status
      else return i;
    });
    this.setBackup();
  }

  destroyItem(index: number): void {
    this.items = this.itemsBackup.filter((i: Item, j: number) => {
      return j != index;
    });
    this.setBackup();
  }

  changeFilter(): void {
    if (this.filterSelected == 'pending')
      this.items = this.itemsBackup.filter((i: Item) => !i.completed );
    else if (this.filterSelected == 'completed')
      this.items = this.itemsBackup.filter((i: Item) => i.completed );
    else
      this.items = this.itemsBackup;
  }

  clearCompletedEvent(clear: boolean): void {
    this.itemsBackup = this.itemsBackup.filter((i: Item) => !i.completed );
    this.changeFilter();
    this.storage.update(this.itemsBackup);
  }

  setBackup(): void {
    this.itemsBackup = this.items;
    this.changeFilter();
    this.storage.update(this.itemsBackup);
  }

}
