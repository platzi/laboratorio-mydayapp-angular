import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterTasksListComponent } from './components/footer-tasks-list/footer-tasks-list.component';
import { MainTasksListComponent } from './components/main-tasks-list/main-tasks-list.component';
import { HomeComponent } from './pages/home/home.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterTasksListComponent,
    MainTasksListComponent,
    TaskComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
