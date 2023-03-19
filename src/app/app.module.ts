import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutofocusDirective } from './directives/autofocus.directive';
import { TodoComponent } from './components/todo/todo.component';
import { FooterLinkComponent } from './components/footer-link/footer-link.component';
import { TodoCountComponent } from './components/todo-count/todo-count.component';
import { ClearCompletedComponent } from './components/clear-completed/clear-completed.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AutofocusDirective,
    TodoComponent,
    FooterLinkComponent,
    TodoCountComponent,
    ClearCompletedComponent,
    CreateTodoComponent,
    TodoListComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
