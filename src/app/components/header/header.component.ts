import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() addTask = new EventEmitter<string>();

  public addTaskInput = new FormControl('');

  constructor() {}

  onKeyEnter() {
    if (this.addTaskInput.value)
    this.addTask.emit(this.addTaskInput.value);
    this.addTaskInput.setValue('');
  }
}
