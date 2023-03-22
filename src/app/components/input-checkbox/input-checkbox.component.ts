import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { InputGenericComponent } from 'src/app/shared/input-generic/input-generic.component';

@Component({
  selector: 'app-input-checkbox',
  template: `
    <input
      class="toggle"
      type="checkbox"
      [(ngModel)]="checked"
      (change)="onCheck()"
    />
    <label (dblclick)="dblclick(idTask)">{{label}}</label>
  `,
  styleUrls: ['./input-checkbox.component.css']
})
export class InputCheckboxComponent extends InputGenericComponent{
  @Input() checked: boolean = false;
  @Input() label: string = '';
  @Input() idTask: number = 0;
  @Output() doubleClick = new EventEmitter<any>();
  constructor(private tasksService: TasksService){
    super()
  }
  onCheck(){
    this.tasksService.completedTask(this.idTask, this.checked);
  }
  dblclick(idTask: number) {
    this.doubleClick.emit(idTask);
  }
}
