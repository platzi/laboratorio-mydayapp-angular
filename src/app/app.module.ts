import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { TodoitemComponent } from './components/todoitem/todoitem.component';
import { TodocountComponent } from './components/todocount/todocount.component';
import { TodofilterComponent } from './components/todofilter/todofilter.component';
import { ClearcompletedComponent } from './components/clearcompleted/clearcompleted.component';
import { EditingComponent } from './components/editing/editing.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TodolistComponent,
    TodoitemComponent,
    TodocountComponent,
    TodofilterComponent,
    ClearcompletedComponent,
    EditingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
