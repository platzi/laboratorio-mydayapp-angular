import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  listTarea: Tarea[] = [];

  private tareas = new BehaviorSubject<Tarea[]>([]);
  tareas$ = this.tareas.asObservable();

  private filter = new BehaviorSubject<string>('all');
  filter$ = this.filter.asObservable();

  private contador = new BehaviorSubject<number>(0);
  contador$ = this.contador.asObservable();

  constructor() { }

  getTareas(){
    let tarea =  localStorage.getItem('mydayapp-angular');
    if(tarea){
      let data:Tarea[] = JSON.parse(tarea);
      this.listTarea = data;
      this.saveTareas();
    }
  }

  filterTareas( mode: string ){
    this.filter.next( mode );
  }

  addTarea(tarea: Tarea){
    tarea.id = Math.random()// this.listTarea.length > 0 ?  Number(this.listTarea.map(tarea => tarea.id).reduce((max, act) => max + act)) + 1 : 0;
    this.listTarea.push(tarea);
    this.saveTareas();
  }

  updateTarea( tarea: Tarea ){
    this.listTarea.map( t => {
      console.log('antes->',t)
      console.log('desp->',tarea)
      if( t.id === tarea.id ){
        t.title = tarea.title.trim();
        t.completed = tarea.completed;
      }
    });
    this.saveTareas();
  }

  deleteTarea( index: number ){
    this.listTarea.splice(index, 1);
    this.saveTareas();
  }

  clearTareas(){
    for(let i = this.listTarea.length - 1; i >= 0; i--){
      if(this.listTarea[i].completed === true){
        this.listTarea.splice(i,1);
      }
    }
    this.saveTareas();
  }

  saveTareas(){
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.listTarea));
    this.tareas.next(this.listTarea);
  }

  setContador( valor: number ){
    this.contador.next( valor );
  }

}
