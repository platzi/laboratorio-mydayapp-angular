import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public items = [];

  constructor() { }

  ngOnInit(): void {
  }

  addItem(item: string): void {
    console.log(item)
  }

}
