import { Component, OnInit, } from '@angular/core';
import { Item } from '../../shared/items.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public items: Item[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addItem(task: string): void {
    this.items = this.items.concat({
      task: task.trim(),
      done: false
    })
  }

  toggleItem(index: number): void {
    this.items = this.items.map((i: Item, j: number) => {
      if (j == index) return { task: i.task, done: !i.done }  // Change task status
      else return i;
    })
  }

  destroyItem(index: number): void {
    this.items = this.items.filter((i: Item, j: number) => {
      return j != index;
    })
  }

}
