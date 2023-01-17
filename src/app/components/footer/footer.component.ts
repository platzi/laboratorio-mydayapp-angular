import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/interfaces/task.interface';
import { TaksService } from 'src/app/services/taks.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  public listTasks!: Tarea[];
  public countList: number = 0;

  constructor(private tasksService: TaksService) {}

  ngOnInit(): void {
    this.tasksService.getListTasks().subscribe((resp) => {
      this.listTasks = resp;
      this.countList = this.listTasks.length;
    });
  }
}
