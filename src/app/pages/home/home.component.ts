import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {ActivationEnd, Router, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  form: UntypedFormGroup;
  tareasArray: Tarea[] = []
  estadoURL: string = ''
  estadoBusqueda = estadoBusqueda
  constructor(
    private _formBuilder: FormBuilder,
    private route: Router
  ) {
    this.form = this._formBuilder.group({
      tareaInput: new UntypedFormControl(null),
      tareas: new UntypedFormControl([])
    })
    const storedApp = localStorage.getItem('mydayapp-angular')
    if(storedApp) {
      this.tareas.setValue(JSON.parse(storedApp));
      this.tareasArray = JSON.parse(storedApp);
    }
    this.route.events.subscribe(res => {
      if(res instanceof ActivationEnd){
        this.estadoURL = res.snapshot.routeConfig?.path ?? ''
        this.stateRoute(this.estadoURL);
      }
    })
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(res => {
      console.log(res)
    })
  }

  ngOnDestroy() {
    this.tareasToLocalStorage();
  }

  changeClass(itemSelected: Tarea): string {
    let classType: string = '';

    const typeClass = {
      new: '',
      completed: 'completed',
      editing: 'editing'
    };

    if (itemSelected.completed) {
      classType = typeClass.completed
    }

    if (itemSelected.editMode) {
      classType = typeClass.editing
    }

    return classType;
  }

  stateRoute(estadoUrl: string){
    if(estadoUrl === estadoBusqueda[estadoBusqueda.all]){
      this.tareasArray = this.tareas.value
    } else if (estadoUrl === estadoBusqueda[estadoBusqueda.completed]){
      this.tareasArray = this.tareas.value.filter((task: Tarea) => task.completed === true)
    } else if (estadoUrl === estadoBusqueda[estadoBusqueda.pending]){
      this.tareasArray = this.tareas.value.filter((task: Tarea) => task.completed === false)
    } else if (estadoUrl === ''){
      this.tareasArray = this.tareas.value
    }
  }

  trackByFn(index: number, tarea: Tarea): string {
    return tarea.id; // Se devuelve él, id de la Tarea como valor único
  }

  aniadirTarea() {
    if (this.tareaInput.value) {
      const nuevaTarea: Tarea = {
        id: this.tareas.value.length,
        title: this.tareaInput.value.trim(),
        completed: false,
        editMode: false
      }
      this.tareas.value.push(nuevaTarea)
      this.tareasArray = this.tareas.value
      this.tareasToLocalStorage()
      this.tareaInput.reset()
    }
  }

  tareaCompletada(tarea: Tarea) {
    tarea.completed = !tarea.completed
    this.stateRoute(this.estadoURL);
    this.tareasToLocalStorage()
  }

  modoEdicion(tarea: Tarea) {
    if (tarea.completed !== true){
      tarea.editMode = !tarea.editMode
      this.tareas.setValue(this.tareasArray)
    }
    this.tareasToLocalStorage()
  }

  tareaEditada(tarea: Tarea, event: Event) {
    this.modoEdicion(tarea);
    tarea.title = (event.target as HTMLInputElement).value.trim();
    this.tareas.setValue(this.tareasArray)
    this.tareasToLocalStorage()
  }

  deleteTarea(tarea: Tarea) {
    const eliminarTarea = this.tareas.value.filter((task: Tarea) => task !== tarea)
    this.tareas.setValue(eliminarTarea);
    this.tareasArray = this.tareas.value;
    this.stateRoute(this.estadoURL);
    this.tareasToLocalStorage();
  }

  tareasPendientes(): Tarea[]{
    return this.tareas.value.filter((tarea:Tarea) => tarea.completed !== true)
  }
  tareasCompletadas(): Tarea[]{
    return this.tareas.value.filter((tarea:Tarea) => tarea.completed === true)
  }

  tareasNoCompletadas(){
    const tareasNoCompletadas = this.tareas.value.filter((tarea:Tarea) => !tarea.completed)
    this.tareas.setValue(tareasNoCompletadas);
    this.tareasArray = this.tareas.value;
    this.stateRoute(this.estadoURL);
    this.tareasToLocalStorage()
  }

  private tareasToLocalStorage() {
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tareas.value));
  }

  get tareaInput(): UntypedFormControl {
    return this.form.get('tareaInput') as UntypedFormControl
  }

  get tareas(): UntypedFormControl {
    return this.form.get('tareas') as UntypedFormControl
  }

}

interface Tarea {
  id: string,
  title: string,
  completed: boolean,
  editMode: boolean
}

enum estadoBusqueda {
  completed = 1,
  pending = 2,
  all = 3
}
