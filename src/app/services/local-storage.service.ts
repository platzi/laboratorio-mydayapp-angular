import { Injectable } from '@angular/core';
import {Todo} from "../models/todo.model";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  setLocal(todo: Todo[]) {
    localStorage.setItem('mydayapp-angular', JSON.stringify(todo));
  }

  getData(){
    const data = localStorage.getItem('mydayapp-angular');
    if(data === null) return [];
    return JSON.parse(data);
  }

}
