import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  @Input() countItems: number = 0;
  @Output() deleteCompleteTasks = new EventEmitter<void>();

  getWord(): string {
    return this.countItems === 1 ? 'item' : 'items';
  }

  deleteCompletedTasks(): void {
    this.deleteCompleteTasks.emit();
  }

}
