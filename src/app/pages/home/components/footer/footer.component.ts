import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent implements OnInit {

  @Input() countItems = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
