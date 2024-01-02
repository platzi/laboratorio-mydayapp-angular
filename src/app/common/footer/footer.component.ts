import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ActivatedRoute, RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive],
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  @Input()
  numTasks: number = 0

  @Input()
  completed: number = 0

  @Output()
  clearTasks = new EventEmitter()

  url = signal<string>('')

  constructor(private route: ActivatedRoute){

  }
  ngOnInit(){
    this.route.url.subscribe(url => {
      if(url.length===0){
        this.url.set('')
        return
      }
      this.url.set(url[0].path)
    })
  }

  //Elimina las tareas completadas
  clearTasksFunc(){
    this.clearTasks.emit()
  }
}
