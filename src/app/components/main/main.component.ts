import { Component, Input } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Tasks } from 'src/app/shared/model/tasks.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @Input() tasks: Tasks[];

  constructor(private tasksService: TasksService){
    this.tasks = this.tasksService.tasksList
  }
  onDoubleClick(id: number){
   this.tasksService.editMode(id, true);
  }
  onEditTask(id: number, value: string){
    this.tasksService.editTask(id, value);
    this.tasksService.editMode(id, false);
  }
  deleteTask(idTask: number){
    this.tasksService.deleteTask(idTask);
  }
}
