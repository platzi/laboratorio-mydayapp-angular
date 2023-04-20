import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { timestamp } from 'rxjs';
import { Tarea } from 'src/app/models/task';
import { ComunicationService } from 'src/app/services/comunication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

tareas : Tarea[] = []
nuevaTarea : Tarea = {id: 0, title : '', completed: false}
tarea = new FormControl()
error = false
limpiar = ''
constructor(private comunicationService: ComunicationService){}
ngOnInit(): void{

}
get tareaField(){
  return this.tarea.value
}

agregarTarea(e:any){
  e.preventDefault()

  if (this.tareaField.trim() != '') {
    this.error = false
    this.nuevaTarea.id = Math.floor(Math.random() * 100000);
    this.nuevaTarea.title = this.tareaField.trim()

    this.nuevaTarea.completed = false

    //?guardando en LS
    const local = localStorage.getItem('mydayapp-angular')
    if(local){
      this.tareas = JSON.parse(local)
      this.tareas.push(this.nuevaTarea)

    }else{
      this.tareas.push(this.nuevaTarea)

    }
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tareas))
    this.comunicationService.addTask.emit()


  }else{
    this.error = true
}
}



reset(){
  this.limpiar = ''
}
}
