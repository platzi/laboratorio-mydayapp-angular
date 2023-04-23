import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/models/task';
import { ComunicationService } from 'src/app/services/comunication.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(private comunicationService : ComunicationService, private ls:LocalstorageService) { }
  tareas : Tarea[] = []


  ngOnInit(): void {
  this.comunicationService.addTask.subscribe(value=>{this.reaload()})
  this.reaload()
  }

  reaload(){
    this.tareas = this.ls.getLocalStorage()
  }

}
