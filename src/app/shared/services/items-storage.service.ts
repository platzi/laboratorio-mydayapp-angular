import { Injectable } from '@angular/core';
import { Item } from '../items.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemsStorageService {

  private storageKey = 'mydayapp-angular';

  constructor() {}

  get(): Item[] {
    const items = localStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }

  update(items: Item[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

}
