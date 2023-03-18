import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { FormsModule } from '@angular/forms';
import { AutofocusDirective } from './directives/autofocus.directive';


@NgModule({
  declarations: [
    AutofocusDirective
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule
  ]
})
export class CoreModule { }
