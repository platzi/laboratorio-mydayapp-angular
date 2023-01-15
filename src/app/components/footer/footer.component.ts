import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  @Output() clearCompleted = new EventEmitter();

  tasks: number = 0;
  pendingTasks: number = 0;
  completedTasks: number = 0;
  route: string = 'all';
  tasksCount: number = 0;

  itemMap = {
    '=1': 'item left',
    'other': 'items left'
  }

  constructor(
    private taskService: TasksService,
    private router: ActivatedRoute,
  ) { 

  }

  ngOnInit(): void {

    this.taskService.allTask$.subscribe(tasks => this.tasksCount = tasks.length)

    this.router.params.subscribe(route => {
      this.route = route['type']
    })

    this.taskService.allTask$.subscribe(tasks => this.pendingTasks = tasks.filter(task => task.completed == false).length)
    this.taskService.allTask$.subscribe(tasks => this.completedTasks = tasks.filter(task => task.completed == true).length)
  }

  clear(){
    this.clearCompleted.emit();  
    this.tasksCount = 0; 
  }


}
