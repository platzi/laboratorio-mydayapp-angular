import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  getLocalStorage(){
    const existe = localStorage.getItem('mydayapp-angular')
    if (existe){
    return JSON.parse(existe)
    }else{return null}
  }
}
