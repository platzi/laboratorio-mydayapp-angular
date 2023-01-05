import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './todo-item/todo-item.component';



@NgModule({
  declarations: [
    TodoItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    TodoItemComponent
  ]
})
export class ComponentsModule { }
