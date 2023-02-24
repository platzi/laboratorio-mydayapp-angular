import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IHomeWork } from '../home/home.component';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {

  toDoList: Array<IHomeWork> = [];
  justCompleted: Array<IHomeWork> = [];

  @Output() homeWorks = new EventEmitter<IHomeWork>();



  constructor() { }

  ngOnInit(): void {
    this.toDoList = JSON.parse(localStorage.getItem('mydayapp-angular') || '[]')
    this.justCompleted = this.toDoList.filter( item => item.completed);
    console.log(this.justCompleted);
    this.addNewItem(this.justCompleted)
  };

  addNewItem(value: any) {
    this.homeWorks.emit(value);
  };

}
