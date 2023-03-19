import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { FooterLink } from 'src/app/utils/interfaces/footerLink.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent {

  public routes: FooterLink[] = [
    { route: '/', activeClass: 'selected', text: 'All' },
    { route: '/pending', activeClass: 'selected', text: 'Pending' },
    { route: '/completed', activeClass: 'selected', text: 'Completed' }
  ]

  constructor(
    public todoService: TodoService
  ) { }
}
