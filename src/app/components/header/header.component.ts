import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() addTask = new EventEmitter<string>();

  public addTaskInput = new FormControl('');

  constructor() {}

  onKeyEnter() {
    if (this.addTaskInput.value?.trim())
    this.addTask.emit(this.addTaskInput.value.trim());
    this.addTaskInput.setValue('');
  }
}
