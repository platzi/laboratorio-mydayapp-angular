import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoComponent } from './components/todo/todo.component';
import { FooterComponent } from './components/footer/footer.component';
import { TodosComponent } from './components/todos/todos.component';
import { CounterComponent } from './components/counter/counter.component';
import { ClearBtnComponent } from './components/clear-btn/clear-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TodoComponent,
    FooterComponent,
    TodosComponent,
    CounterComponent,
    ClearBtnComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
