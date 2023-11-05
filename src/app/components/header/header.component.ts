import { Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  newTask : FormControl;

  constructor(
    private taskService: TasksService
  ){
    this.newTask = new FormControl(null);
  }

  addTask(event:KeyboardEvent){
    if(event.key == 'Enter'){
      let title: string = this.newTask.value;
      if(title && title.trim() != ''){
        this.taskService.createTask(title.trim());
        this.newTask.reset();
      }else{
        console.log('NO SE CREA LA TAREA, NO EXISTE DATA');
      }
    }
  }

}
