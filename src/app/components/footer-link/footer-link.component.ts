import { Component, Input } from '@angular/core';
import { FooterLink } from 'src/app/utils/interfaces/footerLink.interface';

@Component({
  selector: 'app-footer-link',
  templateUrl: './footer-link.component.html',
  styles: []
})
export class FooterLinkComponent {

  @Input() data!: FooterLink;

  constructor() { }

}
