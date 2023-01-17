import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';
import { TaksService } from '../../services/taks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public listTasks!: Task[];
  public countList: number = 0;

  constructor(private tasksService: TaksService) {}

  ngOnInit(): void {
    this.tasksService.getListTasks().subscribe((resp) => {
      this.listTasks = resp;
      this.countList = this.listTasks.length;
    });
  }
}
