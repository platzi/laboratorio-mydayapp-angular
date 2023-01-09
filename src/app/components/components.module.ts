import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    TodoItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [
    TodoItemComponent
  ]
})
export class ComponentsModule { }
