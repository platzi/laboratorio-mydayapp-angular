import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tarea } from 'src/app/models/tarea.model';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['../../../styles.css']
})
export class MainComponent implements OnInit, OnDestroy{

  @ViewChild('edit') inputEdit!: ElementRef;
  @Input() filtro: string = 'all';

  contador: number = 0;
  showButton: boolean = false;
  word: string = 'item';
  

  tareas: Tarea[] = [];
  tareasTemp: Tarea[] = [];

  tareaEdit: Tarea = {id: 0, title: '', completed: false};
  subTarea!: Subscription;
  subFilter!: Subscription;
  isEditing: boolean = false;

  constructor(
    private tareaService: TareaService
  ){

  }

  ngOnInit(){
    this.subTarea = this.tareaService.tareas$
    .subscribe(tareas =>{
      this.showButton = false;
      this.tareas = tareas;
      this.tareas.map(t => {
        if(t.completed === true){
          this.showButton = true;
        }
      });

      this.filtroDatos(this.filtro);
    });
    
    this.subFilter =this.tareaService.filter$
    .subscribe(filter =>{
      this.filtroDatos(filter);
    });

    this.subTarea =this.tareaService.contador$
    .subscribe(cont =>{
      this.contador = cont;
      this.word = this.contador > 1 ? 'items' : 'item';
    });
  }

  filtroDatos(filtro:string){
    console.log('filtro->',filtro)
    if( filtro && filtro !== 'all' ){
      let cond: boolean = filtro === 'pending' ? false : true;
      this.tareasTemp = this.tareas.filter(tarea => tarea.completed === cond);
      // console.log('tareasTemp1->',this.tareasTemp)
    }else{
      this.tareasTemp = this.tareas;
      // console.log('tareasTemp2->',this.tareasTemp)
    }
    this.tareaService.setContador( this.tareas.length );

  }

  editTarea( tarea: Tarea ){
    this.isEditing = true;
    this.tareaEdit = {id: tarea.id, title: tarea.title.replace(/ +(?= )/g,''), completed: tarea.completed};
    // console.log('elemt',this.inputEdit.nativeElement);
    // this.inputEdit.nativeElement.focus();
  }
  
  key(event: any){
    if(event.key === 'Enter'){
      this.updateTarea( this.tareaEdit );
      this.tareaEdit = {id: 0, title: '', completed: false};
      this.isEditing = false;
    }else if( event.key === 'Escape' ){
      this.isEditing = false;
      this.tareaEdit = {id: 0, title: '', completed: false};
    }
  }

  deleteTarea( index: number ){
    this.tareaService.deleteTarea( index );
  }

  updateTarea( tarea: Tarea ){
    this.tareaService.updateTarea( tarea );
  }

  ngOnDestroy(){
    this.subTarea.unsubscribe();
  }

}
