import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Task, ViewConfig } from 'src/app/models/task.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.css']
})
export class PendingTasksComponent implements OnInit {

  @Input() viewConfig: ViewConfig = {
    all: false,
    completed: false,
    uncompleted: true
  }

  constructor() {

  }

  ngOnInit(): void {
      
  }

}
