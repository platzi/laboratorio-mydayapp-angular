import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Event } from '@angular/router';
import { task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
})
export class TaskComponent{

  constructor(private cdr: ChangeDetectorRef) {}

  //La tarea en cuestión
  @Input()
  task?: task;

  //Envia la señal para completar la tarea
  @Output()
  completeTask = new EventEmitter()

  @Output()
  editTask = new EventEmitter()

  @Output()
  updateTask = new EventEmitter()

  @Output()
  deleteTask = new EventEmitter()

  @ViewChild('edit') editInput: ElementRef | undefined;

  //Completa una tarea
  completeTaskFunc(){
    this.completeTask.emit(this.task)
  }

  // Edita una tarea
  editTaskFunc(event: any) {
    if (!this.task?.editing) {
      this.editTask.emit(this.task);
    }
  }

  // Método para enfocar el input
  private focusEditInput() {
    if (this.editInput) {
      this.editInput.nativeElement.focus();
    }
  }

  // Método de ngAfterViewInit
  ngAfterViewInit() {
    // Enfocar el input después de que la vista se haya inicializado
    this.focusEditInput();
  }

    //Edita una tarea
  unEditTaskFunc(event: any){
    if(this.task?.editing){
      this.editTask.emit(this.task)
    }
  }


  //Actualiza una función
  updateTaskFunc(event: any){
    const input = event.target as HTMLInputElement
    this.updateTask.emit([this.task, input.value])
  }

  deleteTaskFunc(){
    this.deleteTask.emit(this.task)
  }
}
