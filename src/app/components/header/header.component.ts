import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() emitTask: EventEmitter<string> = new EventEmitter();

  constructor() {}

  saveTask(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      const value = input.value.trim();
      if (value) this.emitTask.emit(value);
      input.value = '';
    }
  }
}
