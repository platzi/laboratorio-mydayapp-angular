import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
//pages
import { HomeComponent } from './pages/home/home.component';
//Components
import { HeaderComponent } from './pages/components/header/header.component';
import { TodoItemComponent } from './pages/components/todo-item/todo-item.component';
import { TodoListComponent } from './pages/components/todo-list/todo-list.component';
import { FooterComponent } from './pages/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TodoItemComponent,
    TodoListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
