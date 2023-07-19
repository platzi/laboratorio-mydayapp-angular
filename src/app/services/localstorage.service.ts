import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private localStorageKey = 'mydayapp-angular'
  constructor() { }

  getStorage() {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]')
  }

  setStorage(tasks: Task[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks))
  }

}
