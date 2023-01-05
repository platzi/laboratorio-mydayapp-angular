import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Nota } from 'src/app/models/nota.model';
import { EmitService } from 'src/app/service/emit.service';
import {NotasService} from '../../service/notas.service';


window.addEventListener('keydown', (event)=>{
  if(event.key == 'Escape'){
    let controlEmit: EmitService;
  }
});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  tareas: Nota[] = [];


  constructor(
    private notasService: NotasService,
    public  loadData: EmitService
  ) {

    this.loadData.loadDataChores.subscribe(()=>{
      this.ngOnInit();
    });
  }
  ngOnDestroy(): void {
    location.reload();
  }


  ngOnInit(): void {
    this.tareas = this.notasService.getChores();
  }





}
