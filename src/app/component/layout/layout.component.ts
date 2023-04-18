import { Component } from '@angular/core';
import { Tarea } from 'src/app/models/task';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private comunicationService : ComunicationService) { }
  tareas : Tarea[] = []
  mostrar = false
ngOnInit(): void{
  this.comunicationService.addTask.subscribe(value=>{this.show()})
  this.show()
}


show(){
  const existe = localStorage.getItem('mydayapp-angular')
  if (existe){
    this.tareas = JSON.parse(existe)
   }
   if(this.tareas.length > 0 ){
    this.mostrar = true
   }else{this.mostrar = false}
  }

}
