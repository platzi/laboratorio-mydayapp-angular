import { Component } from '@angular/core';
import { Tarea } from 'src/app/models/task';
import { ComunicationService } from 'src/app/services/comunication.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent {

  constructor(private comunicationService : ComunicationService, private ls: LocalstorageService) { }
  tareas : Tarea[] = []
  datos: Tarea[] = []

  ngOnInit(): void {
  this.comunicationService.reCount.subscribe(value=>{this.reaload()})
  this.reaload()
  }

  reaload(){
    this.datos = this.ls.getLocalStorage()

   this.tareas = []
   for (let index = 0; index < this.datos.length; index++) {

    if(this.datos[index].completed == true){
      this.tareas.push(this.datos[index])
    }


  }

  }

}
