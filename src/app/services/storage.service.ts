import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private key = 'mydayapp-angular';

  constructor() { }

  save(task: Task[]): void {
    localStorage.setItem(this.key, JSON.stringify(task));
  }

  readStorage() {
    return JSON.parse(
      localStorage.getItem(this.key) || '[]'
    );
  }
}
