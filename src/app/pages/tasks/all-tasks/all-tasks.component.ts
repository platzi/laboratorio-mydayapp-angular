import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Task, ViewConfig } from 'src/app/models/task.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {

  @Input() viewConfig: ViewConfig = {
    all: true,
    completed: false,
    uncompleted: false
  }

  constructor() {

  }

  ngOnInit(): void {
      
  }
}
