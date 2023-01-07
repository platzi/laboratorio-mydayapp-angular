import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public tasks: Task[] = [];

  constructor() {}

  ngOnInit(): void {}

  get showContent(){
    return this.tasks.length > 0
  }

  onAddTask(title: string) {
    this.tasks.push({
      id: this.tasks.length.toString(),
      title,
      completed:false,
    })
  }

  get pendingTasksCount(){
    return this.tasks.filter(task => !task.completed).length
  }

  get canClear(){
    return this.tasks.some(task => task.completed)
  }
}
