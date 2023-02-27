import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/interfaces/task.interface';
import { TaskListenerService } from 'src/app/services/task-listener.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  public listTasks: Tarea[] = [];
  public countList: number = 0;
  public labelItems: string = 'items';
  public isTaskComplete: boolean = false;
  public path: string = '';

  constructor(private tasksListenerService: TaskListenerService) {}

  ngOnInit(): void {
    this.path = location.pathname;
    this.tasksListenerService.getListTasks().subscribe((resp: Tarea[]) => {
      this.listTasks = resp;
      this.countList = this.listTasks.length;
      this.labelItems = this.countList === 1 ? 'item' : 'items';

      this.isTaskComplete = this.listTasks.some(
        (task: Tarea) => task.completed === true
      );
    });
  }

  clearComplete() {
    const listTemp = [...this.listTasks];
    const notCompleteList = listTemp.filter(
      (element) => element.completed !== true
    );
    this.tasksListenerService.setListTaks(notCompleteList);
  }
}
