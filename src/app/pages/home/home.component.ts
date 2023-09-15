import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tareasNuevas: string[] = [];
  constructor() {}

  ngOnInit(): void {
    console.log('Hola');
  }
}
