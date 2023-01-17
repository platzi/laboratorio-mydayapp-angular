import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/interfaces/task.interface';
import { TaksService } from 'src/app/services/taks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public newTask: string = '';

  constructor(private taskService: TaksService) {}

  ngOnInit(): void {}

  crearNewTask(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Agregar tarea

      const task: Tarea = {
        id: '0',
        title: this.newTask,
        completed: false,
      };

      console.log(task);

      let listTasks = [];

      listTasks.push(task);

      this.taskService.setListTaks(listTasks);
    }
  }
}
