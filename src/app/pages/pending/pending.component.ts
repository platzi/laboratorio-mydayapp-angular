import { Component } from '@angular/core';
import { Tarea } from 'src/app/models/task';
import { ComunicationService } from 'src/app/services/comunication.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent {


  constructor(private comunicationService : ComunicationService, private ls: LocalstorageService) { }
  tareas : Tarea[] = []
  datos: Tarea[] = []

  ngOnInit(): void {
  this.comunicationService.addTask.subscribe(value=>{this.reaload()})
  this.comunicationService.reCount.subscribe(value=>{this.reaload()})
  this.reaload()
  }

  reaload(){
    this.datos = this.ls.getLocalStorage()
    this.tareas = []
   for (let index = 0; index < this.datos.length; index++) {

    if(this.datos[index].completed == false){
      this.tareas.push(this.datos[index])
    }


  }

  }
}
