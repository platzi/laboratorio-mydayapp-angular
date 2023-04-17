import { Component, Input } from '@angular/core';
import { Tarea } from 'src/app/models/task';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
@Input() tarea : Tarea = {id: 0,nombre : '', status : ''}
dataLocal : Tarea[] = []
terminada = false

constructor(private comunication: ComunicationService){}

ngOnInit(): void{
  if(this.tarea.status == 'completed') {
    this.terminada = true
  }

}
toggleTask(){
  const existe = localStorage.getItem('mydayapp-angular')
  if (existe){
    this.dataLocal = JSON.parse(existe)

    var indice = this.dataLocal.map(producto => producto.id).indexOf(this.tarea.id)
    if(this.dataLocal[indice].status == 'pending'){
      this.dataLocal[indice].status = 'completed'
      this.terminada = true
    }else{
      this.dataLocal[indice].status = 'pending'
      this.terminada = false
    }

    localStorage.setItem('mydayapp-angular', JSON.stringify(this.dataLocal))
    this.comunication.reCount.emit()
  }
}
eliminar(){
  const existe = localStorage.getItem('mydayapp-angular')
  if (existe){
    this.dataLocal = JSON.parse(existe)

  var indice = this.dataLocal.map(producto => producto.id).indexOf(this.tarea.id)

  this.dataLocal.splice(indice,1)
  localStorage.setItem('mydayapp-angular', JSON.stringify(this.dataLocal))
    this.comunication.addTask.emit()
  }
}

}
