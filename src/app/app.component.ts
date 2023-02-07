import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit{
  constructor(
    private storageService: StorageService,
  ) {
    this.storageService.fillListTodos();
  }
  ngOnInit():void{
  }
}
