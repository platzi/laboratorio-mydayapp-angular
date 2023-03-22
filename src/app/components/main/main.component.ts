import { Component, Input, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Tasks } from 'src/app/shared/model/tasks.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @Input() tasks: Tasks[] | null = [];
  @ViewChildren('inputEdit') inputs!: QueryList<ElementRef>;

  constructor(private tasksService: TasksService, private elementRef: ElementRef){
    this.tasksService.getTasks();
  }
  onDoubleClick(id: number){
    this.tasksService.editMode(id, true);
    setTimeout(() => {
      const input = this.inputs.toArray()[id - 1].nativeElement;
      input.focus();
    }, 100);
  }
  onEditTask(id: number, value: string){
    this.tasksService.editTask(id, value);
    this.tasksService.editMode(id, false);
  }
  onDiscardChanges(id: number, value: string){
    this.tasksService.editMode(id, false);
    const input = this.inputs.toArray()[id - 1].nativeElement;
    input.value = value;
  }
  deleteTask(idTask: number){
    this.tasksService.deleteTask(idTask);
  }
}
