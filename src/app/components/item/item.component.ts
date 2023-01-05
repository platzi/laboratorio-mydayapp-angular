import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Event } from '@angular/router';
import { Item } from 'src/app/interfaces/item.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  // Referencia al input para editar
  @ViewChild('inputEdit') inputEdit!: ElementRef<HTMLInputElement>;

  @Output() changeItem = new EventEmitter<Item>();
  @Output() deleteItem = new EventEmitter<string>();

  @Input() item: Item = {
    id: '',
    title: '',
    completed: false
  };

  editing: boolean = false;

  // Activa el modo de edición y pone foco en el input
  edit() {
    this.editing = true;
    setTimeout(()=>{
      this.inputEdit.nativeElement.focus();
    },0);  
  }

  onInputChecked() {
    this.item.completed = !this.item.completed;
    this.changeItem.emit(this.item);
  }

  // Termina el modo edición, evalúa el texto, cambia el título, quita el foco y emite el evento
  onChangeTitle() {

    this.editing = false;
    
    if(this.inputEdit.nativeElement.value.trim().length < 1) {
      this.cancelEditing();
    }

    this.item.title = this.inputEdit.nativeElement.value.trim();
    this.changeItem.emit(this.item);
    this.inputEdit.nativeElement.blur();
  }

  // Cancela la edición. Quita el foco y deja el título original.
  cancelEditing() {
    this.inputEdit.nativeElement.value = this.item.title;
    this.inputEdit.nativeElement.blur();
  }

  onDeleteItem() {
    this.deleteItem.emit(this.item.id);
  }

  constructor() {}

}
