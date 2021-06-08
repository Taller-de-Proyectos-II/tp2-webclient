import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from 'src/app/layout-admin/layout.component';

import { TrainingAdminComponent } from './training-admin/training-admin.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAdminComponent,
    children: [
      {
        path: '',
        component: TrainingAdminComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingAdminRoutingModule { }
