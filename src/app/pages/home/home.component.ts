import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Observable } from 'rxjs';
import { Todos } from 'src/app/models/todos.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  storageKeyName = 'mydayapp-angular';
  todoReactiveStorage$!: Observable<Todos[]>
  constructor(
    private storageService: StorageService
  ) {
  }
  ngOnInit(): void {
    this.todoReactiveStorage$ = this.storageService.todoReactiveStorage$;
  }
}