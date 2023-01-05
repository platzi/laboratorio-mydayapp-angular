import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedComponent } from './pages/completed/completed.component';

import { HomeComponent } from './pages/home/home.component';
import { PendingComponent } from './pages/pending/pending.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'pending',
    component: PendingComponent,
    pathMatch: 'full'
  },
  {
    path: 'completed',
    component: CompletedComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
