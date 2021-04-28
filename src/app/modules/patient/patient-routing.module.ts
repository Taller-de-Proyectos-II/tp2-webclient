import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../../layout/layout.component'
import { AlertComponent } from './alert/alert.component';
import { PatientComponent } from './patient/patient.component';
import { ReportComponent } from './report/report.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PatientComponent,
      },
      {
        path: 'reports',
        component: ReportComponent,
      },
      {
        path: 'tests',
        component: TestComponent,
      },
      {
        path: 'alerts',
        component: AlertComponent,
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
