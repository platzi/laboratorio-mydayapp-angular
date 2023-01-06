import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../models/task';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  @Input() task: Task | null = null;

  public isEditing: boolean = false;

  public editionInput = new FormControl();

  @ViewChild("editionElement") editionElement!: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.task!.completed = !this.task!.completed;
  }

  onDoubleClick() {
    this.editionInput.setValue(this.task!.title);
    const timeId = setTimeout(()=>{
      this.editionElement?.nativeElement.focus();
    },100)
    this.isEditing = true;
  }

  onEnterEdition() {
    if (this.editionInput.value.trim()) this.task!.title = this.editionInput.value.trim();
    this.isEditing = false;
  }

  onEscapeEdition(){
    this.isEditing = false;
  }
}
