import { Component, Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { Tarea } from 'src/app/models/task';
import { ComunicationService } from 'src/app/services/comunication.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AfterViewInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent{

@Input() tarea : Tarea = {id: 0,title : '', completed : false}
dataLocal : Tarea[] = []
terminada = false
editar = false
tareaEdited = new FormControl()
constructor(private comunication: ComunicationService, private ls: LocalstorageService){}

ngOnInit(): void{
  if(this.tarea.completed == true) {
    this.terminada = true
  }

}


toggleTask(){

    this.dataLocal = this.ls.getLocalStorage()

    var indice = this.dataLocal.map(producto => producto.id).indexOf(this.tarea.id)
    if(this.dataLocal[indice].completed == false){
      this.dataLocal[indice].completed = true
      this.terminada = true
    }else{
      this.dataLocal[indice].completed = false
      this.terminada = false
    }

    this.ls.setLocalStorage(this.dataLocal)
    this.comunication.reCount.emit()

}
eliminar(){
  this.dataLocal = this.ls.getLocalStorage()

  var indice = this.dataLocal.map(producto => producto.id).indexOf(this.tarea.id)

  this.dataLocal.splice(indice,1)
  this.ls.setLocalStorage(this.dataLocal)
  this.comunication.addTask.emit()

}

click(){
 this.editar =true

}

editContent(e:any){
  e.preventDefault()


   this.dataLocal = this.ls.getLocalStorage()

    var indice = this.dataLocal.map(producto => producto.id).indexOf(this.tarea.id)
    if(this.tareaEditedField){
      var valor = this.tareaEditedField
      this.dataLocal[indice].title = valor.trim()


    this.ls.setLocalStorage(this.dataLocal)
    this.comunication.addTask.emit()
    this.comunication.reCount.emit()
    }


}
get tareaEditedField(){
  return this.tareaEdited.value
}

onKeyDown(e: any){
  if(e.key === "Escape"){
   this.editar = false
    this.tareaEdited.reset()
  }
}
}
