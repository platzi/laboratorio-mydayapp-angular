import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsStorageService } from '../../shared/services/items-storage.service';
import { CategoryFilter } from '../../shared/category-filter.type';
import { Item } from '../../shared/items.interface';

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
        if (p['filter']) {
          this.filterSelected = p['filter'];
          this.changeFilter();
        }
      })
  }

  addItem(task: string): void {
    this.items = this.itemsBackup.concat({
      task: task.trim(),
      done: false
    });
    this.setBackup();
  }

  toggleItem(index: number): void {
    this.items = this.itemsBackup.map((i: Item, j: number) => {
      if (j == index) return { task: i.task, done: !i.done }  // Change task status
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
      this.items = this.itemsBackup.filter((i: Item) => !i.done );
    else if (this.filterSelected == 'completed')
      this.items = this.itemsBackup.filter((i: Item) => i.done );
    else
      this.items = this.itemsBackup;
  }

  clearCompletedEvent(clear: boolean): void {
    this.itemsBackup = this.itemsBackup.filter((i: Item) => !i.done );
    this.changeFilter();
    this.storage.update(this.itemsBackup);
  }

  setBackup(): void {
    this.itemsBackup = this.items;
    this.changeFilter();
    this.storage.update(this.itemsBackup);
  }

}
