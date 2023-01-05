import { Component } from '@angular/core';
import { EmitService } from './service/emit.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {

  constructor(public  loadData: EmitService){


  }
}
