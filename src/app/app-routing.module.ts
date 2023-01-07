import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'all',
    component: HomeComponent,
  },
  {
    path: 'pending',
    component: HomeComponent,
  },
  {
    path: 'completed',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: '/all',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
