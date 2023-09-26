import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tarea } from 'src/app/models/tarea.model';
import { TareaService } from 'src/app/services/tarea.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  
  titleTarea: string = '';
  contador: number = 0;
  subContador!: Subscription;
  filtro: string = 'all';

  constructor(
    private tareaService: TareaService,
    private activatedroute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tareaService.getTareas();
    this.subContador = this.tareaService.contador$
    .subscribe(cont => {
      this.contador = cont;
    });

    this.activatedroute.params
    .subscribe(param => {
      this.filtro = param['filtro'];
      this.tareaService.filterTareas(param['filtro'])
    });
  }

  addTarea(){
    let tarea: Tarea = { id: 0, title: this.titleTarea.replace(/ +(?= )/g,''), completed: false };
    this.tareaService.addTarea(tarea);
    this.titleTarea = '';
  }

  ngOnDestroy(): void {
    this.subContador.unsubscribe();
  }

}
