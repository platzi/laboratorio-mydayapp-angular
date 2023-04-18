import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { CompletedComponent } from './pages/completed/completed.component';

import { HomeComponent } from './pages/home/home.component';
import { PendingComponent } from './pages/pending/pending.component';

const routes: Routes = [
{
  path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'completed',
        component: CompletedComponent,
        pathMatch: 'full'
      },
      {
        path: 'pending',
        component: PendingComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
