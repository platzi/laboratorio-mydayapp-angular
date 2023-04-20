import { Component, Input } from '@angular/core';
import { Tarea } from 'src/app/models/task';
import { ComunicationService } from 'src/app/services/comunication.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
@Input() tareas : Tarea[] = []
arrayFiltrado : Tarea[] = []
contador = 0
contadorCompleted = 0
index = 0
ocultar = false
varRuta = ''


constructor(private comunicate: ComunicationService, private ls: LocalstorageService, private route: ActivatedRoute){}
ngOnInit(): void{
  this.reCount()
  this.comunicate.addTask.subscribe(value=>{this.reCount()})
  this.comunicate.reCount.subscribe(value=>{this.reCount()})


}



reCount(){

  this.tareas = this.ls.getLocalStorage()
  this.contador = this.tareas.filter(x => x.completed == false).length
  this.contadorCompleted = this.tareas.filter(x => x.completed == true).length


  if(this.contadorCompleted == 0){
    this.ocultar = false
  }else{this.ocultar = true}
}

clearCompleted(){

    this.tareas = this.ls.getLocalStorage()

  var completed = this.tareas.filter(x => x.completed == true)
    completed.forEach(element => {
      for(let index in this.tareas){
        if(this.tareas[index].id == element.id){
          this.tareas.splice(this.index,1)
        }
      this.index++
      }
      this.index = 0
    });

  var resultArray = this.tareas
  localStorage.setItem('mydayapp-angular', JSON.stringify(resultArray))
  this.comunicate.addTask.emit()
  this.comunicate.reCount.emit()

}


}
