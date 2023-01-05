import { KeyedWrite } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Nota } from 'src/app/models/nota.model';
import { EmitService } from 'src/app/service/emit.service';
import { NotasService } from 'src/app/service/notas.service';

@Component({
  selector: 'app-list-chores',
  templateUrl: './list-chores.component.html',
  styleUrls: ['./list-chores.component.css']
})
export class ListChoresComponent implements OnInit {

  @Input() estado!: string;
  tareas: Nota[] = [];
  data!: Nota;
  titleEdit!: string|undefined;
  formGroup!: FormGroup;

  constructor(
    private notasService: NotasService,
    public  loadData: EmitService
  ) {
    this.loadData.loadDataChores.subscribe(()=>{
      this.ngOnInit();
    });
  }


  ngOnInit(): void {

    if(this.estado == 'All'){
      this.tareas = this.notasService.getChores();
    }

    if(this.estado == 'Pending'){
      this.tareas = this.notasService.getPendingChores();
    }

    if(this.estado == 'Completed'){
      this.tareas = this.notasService.getCompletedChores();
    }

  }

  clickcheckbox(selectChore: Nota){
    selectChore.completed = !selectChore.completed;
    this.notasService.updateChores(this.tareas);
    this.loadData.loadContadorItem.emit();
  }

  dobleClick(titulo: Nota){
    this.data = titulo;
    this.titleEdit = titulo.id;
    this.captureUpdateChore();
  }

  captureUpdateChore(){
    this.formGroup = new FormGroup({
      newTitle: new FormControl(this.data.title)
    });
  }

  enterText(){
    if(this.formGroup.get('newTitle')?.value.trim() != ""){
      this.data.title = this.formGroup.get('newTitle')?.value.trim();
      this.notasService.updateChores(this.tareas);
      this.loadData.loadDataChores.emit();
      this.titleEdit = undefined;
    }
  }

  escape(){
    this.titleEdit = undefined;
  }

  deletOneChore(id: string){
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.notasService.deleteOneChore(id)));
    this.loadData.loadDataChores.emit();
    this.loadData.loadContadorItem.emit();
  }

}
