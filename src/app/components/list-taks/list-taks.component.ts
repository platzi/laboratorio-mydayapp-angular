import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/interfaces/task.interface';
import { TaskListenerService } from '../../services/task-listener.service';

@Component({
  selector: 'app-list-taks',
  templateUrl: './list-taks.component.html',
  styleUrls: ['./list-taks.component.css'],
})
export class ListTaksComponent implements OnInit {
  public listTasks!: Tarea[];

  constructor(private tasksListenerService: TaskListenerService) {}

  ngOnInit(): void {
    this.tasksListenerService.getListTasks().subscribe((resp) => {
      console.log('List', resp), (this.listTasks = resp);
    });
  }
}
