import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from './guards/access.guard';
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
    canActivate: [AccessGuard]
  },
  {
    path: 'completed',
    component: CompletedComponent,
    canActivate: [AccessGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
