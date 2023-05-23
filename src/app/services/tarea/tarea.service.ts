import { Injectable } from '@angular/core';
import { Tarea } from '../../interfaces/tareas';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  tareas: Array<Tarea> = [];
  pendientes: number = 0;
  completadas: number = 0;

  constructor() { 
    let data = localStorage.getItem('mydayapp-angular');
    if (data) {
      this.tareas = JSON.parse(data);
      this.updateCounters();
    }
  }

  addTarea(title: string) {
    if (title != '') {
      let nuevaTarea: Tarea = {
        id: this.tareas.length,
        title: title.trim(),
        completed: false,
        status: 'pending'
      }
      this.tareas.push(nuevaTarea);
      this.updateCounters();
      this.saveLocalData();
    }
  }

  removerTarea(index: number) {
    this.tareas.splice(index, 1);
    this.updateCounters();
    this.saveLocalData();
  }

  getTareas() {
    return this.tareas;
  }

  completarTarea(index: number) {
    if (this.tareas[index].status === 'pending') {
      this.tareas[index].status = 'completed';
      this.tareas[index].completed = true;
    }
    else if (this.tareas[index].status === 'completed') {
      this.tareas[index].status = 'pending';
      this.tareas[index].completed = false;
    }
    this.updateCounters();
    this.saveLocalData();
  }

  editarTarea(index: number, newTitle: string) {
    if (newTitle != '') {
      this.tareas[index].title = newTitle.trim();
      this.saveLocalData();
    }
  }

  eliminarCompletas() {
    this.tareas = this.tareas.filter(tarea => !tarea.completed);
    this.updateCounters();
    this.saveLocalData();
    return this.tareas;
  }

  cerrarModoEdicion(tareaEditadaBck: string) {
    const index = this.tareas.findIndex(v => v.status === 'editing');
    this.tareas[index].title = tareaEditadaBck;
    this.tareas[index].status = 'pending';
    this.updateCounters();
    this.saveLocalData();
  }

  activaModoEdicion(index: number) {
    this.tareas[index].status = 'editing';
  }

  updateCounters() {
    this.pendientes = this.tareas.filter(tarea => !tarea.completed).length;
    this.completadas = this.tareas.filter(tarea => tarea.completed).length;
  }

  saveLocalData() {
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tareas));
  }
}
