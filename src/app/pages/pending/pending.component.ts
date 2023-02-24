import { Component, OnInit } from '@angular/core';
import { IHomeWork } from '../home/home.component';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  toDoList: Array<IHomeWork> = [];
  justPending: Array<IHomeWork> = [];


  constructor() { }

  ngOnInit(): void {
    this.toDoList = JSON.parse(localStorage.getItem('mydayapp-angular') || '[]')
    this.justPending = this.toDoList.filter( item => !item.completed);
  }

}
