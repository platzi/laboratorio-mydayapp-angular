import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';
import { TaksService } from 'src/app/services/taks.service';

@Component({
  selector: 'app-list-taks',
  templateUrl: './list-taks.component.html',
  styleUrls: ['./list-taks.component.css'],
})
export class ListTaksComponent implements OnInit {
  public listTasks!: Task[];

  constructor(private taksService: TaksService) {}

  ngOnInit(): void {
    this.taksService.getListTasks().subscribe((resp) => {
      console.log('List', resp), (this.listTasks = resp);
    });
  }
}
