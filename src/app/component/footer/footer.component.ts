import { Component, Input, OnInit } from '@angular/core';
import { Nota } from 'src/app/models/nota.model';
import { EmitService } from 'src/app/service/emit.service';
import { NotasService } from 'src/app/service/notas.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() estado!: string
  tareas: Nota[] = [];


  constructor(
    private notasService: NotasService,
    public loadData: EmitService
  ) {
    this.loadData.loadContadorItem.subscribe(()=>{
      this.tareas = [];
      this.tareas = this.notasService.getPendingChores();
    });
  }

  ngOnInit(): void {
    this.tareas = this.notasService.getPendingChores();
  }

  deleteChores(){
    this.notasService.deleteChoresCompleted();
    this.loadData.loadDataChores.emit();
  }

}
