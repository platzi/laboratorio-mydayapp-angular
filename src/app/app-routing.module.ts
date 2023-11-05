import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PendingComponent } from './pages/pending/pending.component';
import { CompletedComponent } from './pages/completed/completed.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: HomeComponent,
    // pathMatch: 'full',
  },
  {
    path: 'pending',
    component: PendingComponent
  },
  {
    path: 'completed',
    component: CompletedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
