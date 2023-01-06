import { Component, OnInit, } from '@angular/core';
import { CategoryFilter } from '../../shared/category-filter.type';
import { Item } from '../../shared/items.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public items: Item[] = [];
  public itemsBackup: Item[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addItem(task: string): void {
    this.items = this.items.concat({
      task: task.trim(),
      done: false
    });
    this.setBackup();
  }

  toggleItem(index: number): void {
    this.items = this.items.map((i: Item, j: number) => {
      if (j == index) return { task: i.task, done: !i.done }  // Change task status
      else return i;
    });
    this.setBackup();
  }

  destroyItem(index: number): void {
    this.items = this.items.filter((i: Item, j: number) => {
      return j != index;
    });
    this.setBackup();
  }

  changeFilter(filter: CategoryFilter): void {
    if (filter == 'pending') {
      this.items = this.itemsBackup.filter((i: Item) => !i.done );
    } else if (filter == 'completed') {
      this.items = this.itemsBackup.filter((i: Item) => i.done );
    } else {
      this.items = this.itemsBackup;
    }

    console.log('this.items', this.items)
    console.log('this.itemsBackup', this.itemsBackup)
  }

  setBackup(): void {
    this.itemsBackup = this.items;
  }

}
