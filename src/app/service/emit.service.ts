import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitService {

  loadDataChores = new EventEmitter();
  loadContadorItem = new EventEmitter();


}
