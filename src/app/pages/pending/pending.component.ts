import { Component } from '@angular/core';
import { Tarea } from 'src/app/models/task';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent {


  constructor(private comunicationService : ComunicationService) { }
  tareas : Tarea[] = []
  datos: Tarea[] = []

  ngOnInit(): void {
  this.comunicationService.addTask.subscribe(value=>{this.reaload()})
  this.comunicationService.reCount.subscribe(value=>{this.reaload()})
  this.reaload()
  }

  reaload(){
    const existe = localStorage.getItem('mydayapp-angular')
  if (existe){
    this.datos = JSON.parse(existe)
    this.tareas = []
   for (let index = 0; index < this.datos.length; index++) {

    if(this.datos[index].completed == false){
      this.tareas.push(this.datos[index])
    }

   }
  }

  }
}
