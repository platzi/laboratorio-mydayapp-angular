import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Task, ViewConfig } from 'src/app/models/task.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css']
})
export class CompletedTasksComponent implements OnInit {

  @Input() viewConfig: ViewConfig = {
    all: false,
    completed: true,
    uncompleted: false
  }

  constructor() {

  }

  ngOnInit(): void {
      
  }

}
