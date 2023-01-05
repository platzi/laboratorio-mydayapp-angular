import { Component} from '@angular/core';
import { Item } from 'src/app/interfaces/item.interface';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private itemsService: ItemsService) {}
   
  addItem(item: Item) {
    this.itemsService.addItem(item);
  }

  // Completar o cambiar titulo de un item
  changeItem(updatedItem: Item) {
    this.itemsService.changeItem(updatedItem);
  }

  deleteItem(id: string) {
    this.itemsService.deleteItem(id);
  }

  getPendingItems() {
    return this.itemsService.getPendingItems();
  }

  get totalItems() {
    return this.itemsService.itemsList.length;
  }

  // Obtiene los items totales o filtrados dependiendo de la ruta
  get itemsList() {
    return this.itemsService.getFilteredItems();
  }
  

}
