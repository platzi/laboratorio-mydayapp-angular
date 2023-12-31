import { Component, OnInit, signal } from '@angular/core';
import { task } from 'src/app/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor() { }

  tasks = signal<task[]>([{
    id: "juanda",
    title: "Soy una tarea",
    completed: false
  }])

  ngOnInit(): void {
  }

}
