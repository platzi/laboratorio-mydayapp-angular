import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todocount',
  templateUrl: './todocount.component.html',
  styleUrls: ['./todocount.component.css']
})
export class TodocountComponent {
  @Input() count = 0;

  constructor() { }
}
