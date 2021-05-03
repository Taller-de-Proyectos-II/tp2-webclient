import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { DialogConfirmationModule } from 'src/app/shared/dialog-confirmation/dialog-confirmation.module';

import { LayoutModule } from '../../layout/layout.module';
import { MaterialModule } from '../../shared/material/material.module';
import { AlertComponent } from './alert/alert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogPatientComponent } from './dialog-patient/dialog-patient.component';
import { DialogReportComponent } from './dialog-report/dialog-report.component';
import { DialogTestComponent } from './dialog-test/dialog-test.component';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient/patient.component';
import { ReportComponent } from './report/report.component';
import { TestComponent } from './test/test.component';

// For MDB Angular Free

@NgModule({
  declarations: [
    PatientComponent,
    DialogPatientComponent,
    TestComponent,
    ReportComponent,
    DialogReportComponent,
    DialogTestComponent,
    AlertComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    MaterialModule,
    DialogConfirmationModule,
    FormsModule,
    ChartsModule
  ],
  entryComponents: [DialogPatientComponent, DialogReportComponent, DialogTestComponent],
})
export class PatientModule {}
