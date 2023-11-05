import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  @Input() countItems: number = 0;

  getWord(): string {
    return this.countItems === 1 ? 'item' : 'items';
  }

}
