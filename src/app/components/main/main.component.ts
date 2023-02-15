import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent implements OnInit {

  @Output() addTaskEvent = new EventEmitter<string>();

  public formTasks!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formTasks = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  addTask(): void {
    if (this.formTasks.get('title')?.value) {
      this.addTaskEvent.emit(this.formTasks.get('title')?.value);
      this.formTasks.patchValue({ title: '' });
    }
  }

}
