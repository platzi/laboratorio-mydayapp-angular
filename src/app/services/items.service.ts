import { Injectable, OnInit } from '@angular/core';
import { Item } from '../interfaces/item.interface';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  itemsList: Item[] = [];
  filterRoute = '/';

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    // Obtenemos los items guardados en localStorage
    this.itemsList = this.storageService.getData();

    // Listener para el cambio de ruta, al cambiar de ruta, se modifica la propiedad filterRoute. De esta manera se sabe en todo momento en que ruta está la app.
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) this.filterRoute = event.url;
    });
    
  }

  // Se añade un item al array y se guarda en el localStorage
  addItem(item: Item) {
    this.itemsList.push(item);
    this.storageService.saveData(this.itemsList);
  }

  // Se modifica/completa un item en el array y se guarda en el localStorage
  changeItem(updatedItem: Item) {
    this.itemsList = this.itemsList.map((item) => {
      return item.id === updatedItem.id ? updatedItem : item
    });
    this.storageService.saveData(this.itemsList);
  }

  // Se elimina un item del array y se guarda en el localStorage
  deleteItem(id: string) {
    this.itemsList.splice(this.itemsList.findIndex(item => item.id === id), 1);
    this.storageService.saveData(this.itemsList);
  }

  // Funcnion para obtener los items pendientes
  getPendingItems() {
    return this.itemsList.filter(item => {
      return item.completed ? null : item
    }).length
  }

  // Funcnion para obtener los items completados
  getCompletedItems() {
    return this.itemsList.filter(item => {
      return item.completed ? item : null
    }).length
  }

  // Funcnion para limpiar los items completados y guardarlo en el storage
  clearCompleted() {
    this.itemsList = this.itemsList.filter(item => {
      return !item.completed;
    });
    this.storageService.saveData(this.itemsList);
  }

  // Función para retornar a los componentes los items filtrados en base a la ruta
  getFilteredItems() {
    switch (this.filterRoute) {
      case '/':
        return this.itemsList;
      case '/pending':
        return this.itemsList.filter(item => !item.completed);
      case '/completed':
        return this.itemsList.filter(item => item.completed);
      default:
        return this.itemsList;
    }
  }

}
