import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private keyStorage = 'mydayapp-angular';
  saveItem(value: any) {
    localStorage.setItem(this.keyStorage, JSON.stringify(value));
  }

  getData() {
    return JSON.parse(localStorage.getItem(this.keyStorage) || '[]');
  }
}
