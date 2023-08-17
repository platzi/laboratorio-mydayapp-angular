import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PendingTasksComponent } from './pages/tasks/pending-tasks/pending-tasks.component';
import { CompletedTasksComponent } from './pages/tasks/completed-tasks/completed-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'pending',
    component: PendingTasksComponent
  },
  {
    path: 'completed',
    component: CompletedTasksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
