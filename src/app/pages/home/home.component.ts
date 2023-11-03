import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  listTasks: Task[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addTask(taskName: string) {
    const task: Task = {
      id: this.listTasks.length + 1,
      name: taskName,
      completed: false
    };
    this.listTasks.push(task);
  }

  deleteTask(task: Task) {
    this.listTasks = this.listTasks.filter(t => t.id !== task.id);
  }

  updateTask(task: Task) {
    this.listTasks = this.listTasks.map(t => {
      if (t.id === task.id) {
        t.completed = !t.completed;
      }
      return t;
    });
  }

  get pendingTasks() {
    return this.listTasks.filter(t => !t.completed).length;
  }

  get completedTasks() {
    return this.listTasks.filter(t => t.completed).length;
  }

  get totalTasks() {
    return this.listTasks.length;
  } 

  get showMainFooter(): boolean {
    return this.listTasks.length > 0;
  }

  addtest(){
    this.addTask("test");
  }

}
