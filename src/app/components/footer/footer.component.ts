import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  @Input() pendingTasks = 0;
  @Output() clearCompleted: EventEmitter<void> = new EventEmitter();
}
