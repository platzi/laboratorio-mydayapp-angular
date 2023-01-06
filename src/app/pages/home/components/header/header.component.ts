import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  @Output() addItemEvent = new EventEmitter<string>();

  public formItems!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formItems = this.formBuilder.group({
      task: ['', Validators.required],
    });
  }

  addItem(): void {
    if (this.formItems.get('task')?.value) {
      this.addItemEvent.emit(this.formItems.get('task')?.value);
      this.router.navigate([`/all`]);
      this.formItems.patchValue({ task: '' });
    }
  }

}
