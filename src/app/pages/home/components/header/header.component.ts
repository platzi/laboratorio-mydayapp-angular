import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Output() addItemEvent = new EventEmitter<string>();

  public formItems!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formItems = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  addItem(): void {
    if (this.formItems.get('title')?.value) {
      this.addItemEvent.emit(this.formItems.get('title')?.value);
      this.formItems.patchValue({ title: '' });
    }
  }
}
