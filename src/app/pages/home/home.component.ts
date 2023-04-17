import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/models/task';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(private comunicationService : ComunicationService) { }
  tareas : Tarea[] = []


  ngOnInit(): void {
  this.comunicationService.addTask.subscribe(value=>{this.reaload()})
  this.reaload()
  }

  reaload(){
    const existe = localStorage.getItem('mydayapp-angular')
  if (existe){
    this.tareas = JSON.parse(existe)
   }
  }

}
