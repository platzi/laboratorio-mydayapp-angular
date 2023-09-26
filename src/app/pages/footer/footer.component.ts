import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../../../styles.css']
})
export class FooterComponent  implements OnInit, OnDestroy{
  
  // contador: number = 0;
  subTarea!: Subscription;
  

  @Input() contador: number = 0;
  @Input() showButton: boolean = false;
  @Input() word: string = 'item';

  constructor(
    private tareaService: TareaService
  ){
  }


  ngOnInit(): void {
    console.log('ngOnInit')
  }

  filterTareas( mode: string ){
    this.tareaService.filterTareas( mode );
  }

  clearTareas(){
    this.tareaService.clearTareas();
  }

  ngOnDestroy(): void {
    console.log('onDestroy')
  }
}
