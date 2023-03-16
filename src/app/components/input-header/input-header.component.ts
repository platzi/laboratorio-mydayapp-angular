import { Component } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { InputGenericComponent } from '../../shared/input-generic/input-generic.component';

@Component({
  selector: 'app-input-header',
  template: `
    <input
      class="new-todo"
      placeholder="Type new todo"
      autofocus
      [type]="type"
      [(ngModel)]="value"
      (keyup.enter)="newTask(value.trim())"
    />
  `,
  styleUrls: ['./input-header.component.css']
})
export class InputHeaderComponent extends InputGenericComponent{
  constructor(private tasksService: TasksService){
    super()
  }

  newTask(value: string){
    if(value.length > 0){
      this.tasksService.addTask(value);
      this.value = '';
    }
  }
}
