import { Component, Input } from '@angular/core';
import { InputInterface } from 'src/app/shared/model/input.model';

@Component({
  selector: 'app-input-generic',
  template: `
    <input [type]="type" [class]="class" [value]="value"/>
  `,
  styleUrls: ['./input-generic.component.css']
})
export class InputGenericComponent {
  @Input() type: InputInterface = 'text';
  @Input() class: string = '';
  @Input() value: any = '';
}
