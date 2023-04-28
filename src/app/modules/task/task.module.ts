import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './components/task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PendingTaskComponent } from './pages/pending-task/pending-task.component';
import { CompletedTaskComponent } from './pages/completed-task/completed-task.component';
import { AllTaskComponent } from './pages/all-task/all-task.component';
import { RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [
    TaskComponent,
    PendingTaskComponent,
    CompletedTaskComponent,
    AllTaskComponent,
    
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLinkActive
  ], 
  exports: [
    TaskComponent
  ]
})
export class TaskModule { }
