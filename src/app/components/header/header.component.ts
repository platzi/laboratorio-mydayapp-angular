import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/interfaces/task.interface';
import { TaskListenerService } from 'src/app/services/task-listener.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public newTask: string = '';
  public listTask: Tarea[] = [];

  constructor(private tasksListenerService: TaskListenerService) {}

  ngOnInit(): void {
    this.tasksListenerService.getListTasks().subscribe((listTask) => {
      this.listTask = listTask;
    });
  }

  crearNewTask(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Agregar tarea
      const id = (this.listTask.length + 1).toString();

      const task: Tarea = {
        id,
        title: this.newTask.trim(),
        completed: false,
      };

      this.listTask.push(task);
      const newList = [...this.listTask];
      this.tasksListenerService.setListTaks(newList);
      this.newTask = '';
    }
  }
}
