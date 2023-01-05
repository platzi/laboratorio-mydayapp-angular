import { Injectable } from '@angular/core';
import { Nota } from '../models/nota.model';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  tareas: Nota[] = [];
  //constructor() { }

  setNewChores(data: Nota){
    this.tareas = JSON.parse(localStorage.getItem('mydayapp-angular') || '[]');
    let cantidad: number = this.tareas.length;
    if(cantidad == 0){
      data.id = '1';
      this.tareas.push(data);
    }

    if(cantidad > 0){
      data.id = String(Number(this.tareas[cantidad-1].id) + 1);
      this.tareas.push(data);
    }

    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tareas));
  }

  getChores(){
    this.tareas = JSON.parse(localStorage.getItem('mydayapp-angular') || '[]');
    return this.tareas;
  }

  getPendingChores(){
    this.tareas = this.getChores();
    return this.tareas.map(
      (dato: Nota) => {
        let auxDato!: Nota;
        if(dato.completed === false){
          auxDato = dato;
        }
        return auxDato
      }
    ).filter(
      (dato) => {
        return dato !== undefined;
      }
    );
  }

  getCompletedChores(){
    this.tareas = this.getChores();
    return this.tareas.map(
      (dato: Nota) => {
        let auxDato!: Nota;
        if(dato.completed === true){
          auxDato = dato;
        }
        return auxDato
      }
    ).filter(
      (dato) => {
        return dato !== undefined;
      }
    );
  }

  getChoresPending(){

    this.tareas = JSON.parse(localStorage.getItem('mydayapp-angular') || '[]');
    return this.tareas.map(
      (dato: Nota) => {
        let auxDato!: Nota;
        if(dato.completed == false){
          auxDato = dato;
        }
        return auxDato;
      }
    ).filter(
      (dato) => {
        return dato !== undefined;
      }
    );
  }

  updateChores(data: Nota[]){
    localStorage.setItem('mydayapp-angular', JSON.stringify(data));
  }

  deleteOneChore(id: string){
    this.tareas = JSON.parse(localStorage.getItem('mydayapp-angular') || '[]');
    return this.tareas.map(
      (dato: Nota)=>{
        let auxDato!: Nota;
        if(dato.id != id){
          auxDato = dato;
        }
        return auxDato
      }
    ).filter(
      (dato) => {
        return dato !== undefined;
      }
    );
  }

  deleteChoresCompleted(){
    let newChores: Nota[] = this.getChoresPending();
    localStorage.setItem('mydayapp-angular', JSON.stringify(newChores));
  }
}
