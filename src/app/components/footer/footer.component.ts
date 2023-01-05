import { Component, Input, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private itemsService: ItemsService) { }

  get pendingItems() {
    return this.itemsService.getPendingItems();
  }

  get completedItems() {
    return this.itemsService.getCompletedItems();
  }

  clear() {
    this.itemsService.clearCompleted();
  }

  // Estado de la ruta para saber que botón resaltar
  get filterRoute() {
    return this.itemsService.filterRoute;
  }

}
