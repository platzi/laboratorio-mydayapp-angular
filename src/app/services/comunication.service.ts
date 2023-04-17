import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  constructor() { }

  @Output() addTask: EventEmitter<string> = new EventEmitter<string>();
  @Output() reCount: EventEmitter<string> = new EventEmitter<string>();
}
