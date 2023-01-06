import { Component, OnInit } from '@angular/core';
import { Item } from '../items.interface';

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
    this.items.push({
      task: task,
      done: false
    })
  }

}
