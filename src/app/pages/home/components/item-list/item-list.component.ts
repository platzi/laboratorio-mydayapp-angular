import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../items.interface';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: []
})
export class ItemListComponent implements OnInit {

  @Input() items: Item[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
