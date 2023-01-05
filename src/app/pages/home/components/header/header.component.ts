import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  @Output() inputTask = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
