import { Injectable } from '@angular/core';
import { Todo } from '../pages/home/todo.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItems<T>(localStorageKey: string, items: T) {
    const stringifiedItems = JSON.stringify(items);
    localStorage.setItem(localStorageKey, stringifiedItems);
  }


  getItems<T>(localStorageKey: string) {
    const stringifiedResult = localStorage.getItem(localStorageKey);
    if (stringifiedResult) {
      return JSON.parse(stringifiedResult) as T;
    }
    return [];
  }
}
