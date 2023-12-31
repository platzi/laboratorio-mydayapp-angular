import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '@angular/router';
import { task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
})
export class TaskComponent {

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

  //Completa una tarea
  completeTaskFunc(){
    this.completeTask.emit(this.task)
  }

  //Edita una tarea
  editTaskFunc(){
    this.editTask.emit(this.task)
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
