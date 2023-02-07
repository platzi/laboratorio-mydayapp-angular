import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  tempNewTodo: string;
  constructor(
    private storageService: StorageService
  ) {
    this.tempNewTodo = "";
  }

  ngOnInit(): void {
  }
  sendValue():void {
    this.tempNewTodo = this.tempNewTodo.trim();
    if (this.tempNewTodo != "") {
      this.storageService.addTodo(this.tempNewTodo);
      this.tempNewTodo = '';
    }
  }
}
