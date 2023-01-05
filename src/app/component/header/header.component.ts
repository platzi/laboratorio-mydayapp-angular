import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Nota } from 'src/app/models/nota.model';
import { EmitService } from 'src/app/service/emit.service';
import { NotasService } from 'src/app/service/notas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  data!: Nota;
  datoTarea: string = "";
  formGroup!: FormGroup;

  constructor(
    private notasService: NotasService,
    public  loadData: EmitService
  ) {

  }

  ngOnInit(): void {
    this.capturaTarea();
  }

  capturaTarea(){
    this.formGroup = new FormGroup({
      tituloTarea: new FormControl('')
    })
  }

  enterText(){
    if(this.formGroup.get('tituloTarea')?.value.trim() != ""){
      this.data = {
        id: '0',
        title: this.formGroup.get('tituloTarea')?.value.trim(),
        completed: false
      };
      this.notasService.setNewChores(this.data);
      this.loadData.loadDataChores.emit();
      this.loadData.loadContadorItem.emit();
      this.formGroup.get('tituloTarea')?.reset();
    }
  }

}
