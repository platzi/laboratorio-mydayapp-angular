import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTaskComponent } from './pages/all-task/all-task.component';
import { PendingTaskComponent } from './pages/pending-task/pending-task.component';
import { CompletedTaskComponent } from './pages/completed-task/completed-task.component';


const routes: Routes = [

  {
    path: '',
    component: AllTaskComponent,
    pathMatch: 'full'
  },
  {
    path: 'pending',
    component: PendingTaskComponent,
  },
  {
    path: 'completed',
    component: CompletedTaskComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
