import { Component, Input, Output, EventEmitter, ViewChildren, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { Item, ItemEdited } from '../../../../shared/items.interface';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: [],
})
export class ItemListComponent {

  @ViewChildren('inputEdit') inputEdit!: QueryList<ElementRef<HTMLInputElement>>;

  @Input() items: Item[] = [];

  @Output() editItemEvent = new EventEmitter<ItemEdited>();
  @Output() toggleItemEvent = new EventEmitter<number>();
  @Output() destroyItemEvent = new EventEmitter<number>();

  public itemEdited?: ItemEdited | null;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  editingItem(item: Item, index: number): void {
    this.itemEdited = {
      index: index,
      task: item.task,
      done: item.done,
    }
    this.cdRef.detectChanges();
    this.inputEdit.toArray()[index].nativeElement.focus();
  }

  confirmEdition(index: number): void {
    if (this.inputEdit.toArray()[index].nativeElement.value) {
      this.editItemEvent.emit({
        index: this.itemEdited?.index ?? 0,
        task: this.inputEdit.toArray()[index].nativeElement.value.trim(),
        done: this.itemEdited?.done ?? false,
      });
      this.cancelEdition();
    }
  }

  cancelEdition(): void {
    this.itemEdited = null;
  }

  toggleItem(index: number): void {
    this.toggleItemEvent.emit(index);
  }

  destroyItem(index: number): void {
    this.destroyItemEvent.emit(index);
  }

}
