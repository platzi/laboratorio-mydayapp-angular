import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Item } from 'src/app/interfaces/item.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // Emitter para cuando se crea un item
  @Output() newItem = new EventEmitter<Item>();

  // Referencia al input
  @ViewChild('newItemInput') newItemInput!: ElementRef<HTMLInputElement>;
  
  constructor() { }

  // Evalua el texto y añade un nuevo item generando un id y seteando completado como false. Por último limpia el input
  addItem() {

    const value = this.newItemInput.nativeElement.value;

    if(value.trim().length === 0) return;
    
    this.newItem.emit({
      id: uuidv4(),
      title: this.newItemInput.nativeElement.value,
      completed: false
    });

    this.newItemInput.nativeElement.value = '';

  }

}
