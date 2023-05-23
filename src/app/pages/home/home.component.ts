import { Component, OnInit,  HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tarea } from '../../interfaces/tareas';
import { TareaService } from '../../services/tarea/tarea.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  tareas: Tarea[] = [];
  tarea: string = '';
  tareaEditada: string = '';
  tareaEditadaBck: string = '';
  modoEditando: boolean = false;
  subscriber: Subscription | undefined;
  activeRoute: string = '';

  constructor(
    private route: ActivatedRoute,
    private tareaService: TareaService
  ) { }

  ngOnInit(): void {

    this.subscriber = this.route.params.subscribe(params => {
      const status = params['status'];
      if (status === 'pending') {
        this.filtrarTareas('pending');
        this.activeRoute = 'pending';
      }
      else if (status === 'completed') {
        this.filtrarTareas('completed');
        this.activeRoute = 'completed';
      }
      else {
        this.filtrarTareas('all');
        this.activeRoute = 'all';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  @HostListener('document:keyup.escape', ['$event']) onKeyupHandler(event: KeyboardEvent) {
    if (this.modoEditando) {
      this.cerrarModoEdicion();
    }
  }

  getTotal() {
    return this.tareaService.getTareas().length;
  }

  agregarTarea() {
    this.tareaService.addTarea(this.tarea);
    this.tarea = '';
  }

  editarTarea(index: number) {
    this.tareaEditadaBck = this.tareaEditada.trim();
    this.tareaService.editarTarea(index, this.tareaEditada);
    this.cerrarModoEdicion();
  }

  eliminarTarea(index: number) {
    this.tareaService.removerTarea(index);
  }

  activaModoEdicion(index: number) {
    this.tareaEditada = this.tareas[index].title;
    this.tareaEditadaBck = this.tareas[index].title;
    this.tareaService.activaModoEdicion(index);
    this.modoEditando = true;
  }

  cerrarModoEdicion() {
    this.tareaService.cerrarModoEdicion(this.tareaEditadaBck);
    this.modoEditando = false;
  }

  cambiarEstadoTarea(index: number) {
    this.tareaService.completarTarea(index);
  }

  totalRegistros(): number {
    return this.tareaService.getTareas().length;
  }

  tareasCompletadas(): number {
    return this.tareaService.completadas;
  }

  eliminarTareasCompletadas() {
    this.tareas = this.tareaService.eliminarCompletas();
  }

  filtrarTareas(filter: string) {
    switch (filter) {
      case 'all':
        this.tareas = this.tareaService.getTareas();
        break;
      case 'pending':
        this.tareas = this.tareaService.getTareas().filter(tarea => !tarea.completed);
        break;
      case 'completed':
        this.tareas = this.tareaService.getTareas().filter(tarea => tarea.completed);
        break;
      default:
        this.tareas = this.tareaService.getTareas();
        break;
    }
  }

}
