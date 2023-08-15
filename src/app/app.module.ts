import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule


import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AllTasksComponent } from './pages/tasks/all-tasks/all-tasks.component';
import { PendingTasksComponent } from './pages/tasks/pending-tasks/pending-tasks.component';
import { CompletedTasksComponent } from './pages/tasks/completed-tasks/completed-tasks.component';
import { TaskListOrganismComponent } from './shared/organisms/task-list-organism/task-list-organism.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AllTasksComponent,
    PendingTasksComponent,
    CompletedTasksComponent,
    TaskListOrganismComponent
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
