import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}
  private localStorageKey = 'mydayapp-angular';

  // Guardar en Storage
  saveData(data: Item[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  // Retornar datos del storage
  getData() {
    return JSON.parse(localStorage.getItem(this.localStorageKey)!) || [];
  }
}
