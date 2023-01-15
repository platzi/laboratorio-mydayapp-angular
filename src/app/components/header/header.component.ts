import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  taskTitle: string = '' 

  constructor(
    private taskService : TasksService
  ) { 

  }

  ngOnInit(): void {
  }

  saveTask(){
    
    this.taskService.addTask(this.taskTitle.trim());
    this.taskTitle = '';
  }

}
