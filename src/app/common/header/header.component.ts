import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output()
  taskTitle = new EventEmitter()

  //Representa el formulario de la tarea
  newTaskCtrl = new FormControl("", {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
    ]
  })

  /**
   * Envia una nueva tarea a crear
   */
  createNewTask(){
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim()
      this.taskTitle.emit(value)
    }
    this.newTaskCtrl.setValue("")
  }
}
