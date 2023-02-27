import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/interfaces/task.interface';
import { TaskListenerService } from 'src/app/services/task-listener.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public listTasks!: Tarea[];
  public countList: number = 0;

  constructor(private tasksListenerService: TaskListenerService) {}

  ngOnInit(): void {
    this.tasksListenerService.getListTasks().subscribe((resp) => {
      this.listTasks = resp;
      this.countList = this.listTasks.length;
    });
  }
}
