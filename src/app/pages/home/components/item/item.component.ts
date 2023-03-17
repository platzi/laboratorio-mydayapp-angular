import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Item, ItemEdited } from 'src/app/shared/items.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent {

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
      id: index,
      title: item.title,
      completed: item.completed,
    }
    this.cdRef.detectChanges();
    this.inputEdit.toArray()[index].nativeElement.focus();
  }

  confirmEdition(index: number): void {
    if (this.inputEdit.toArray()[index].nativeElement.value) {
      this.editItemEvent.emit({
        id: this.itemEdited?.id ?? 0,
        title: this.inputEdit.toArray()[index].nativeElement.value.trim(),
        completed: this.itemEdited?.completed ?? false,
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
