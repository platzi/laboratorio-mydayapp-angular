import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from '../../../items.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent implements OnInit {

  public items: Item[] = [];

  public itemsLeft = 0;
  public itemsDone = 0;

  @Input() set setItems(items: Item[]) {
    this.items = items;
    this.itemsLeft = 0;
    this.itemsDone = 0;
    this.items.forEach((i: Item) => {
      if (i.done) this.itemsDone++;
      else this.itemsLeft++;
    });
  }

  constructor() { }

  ngOnInit(): void {
  }

}
