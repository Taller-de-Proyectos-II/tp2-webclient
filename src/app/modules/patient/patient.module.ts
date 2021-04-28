import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogConfirmationModule } from 'src/app/shared/dialog-confirmation/dialog-confirmation.module';

import { LayoutModule } from '../../layout/layout.module';
import { MaterialModule } from '../../shared/material/material.module';
import { DialogPatientComponent } from './dialog-patient/dialog-patient.component';
import { DialogReportComponent } from './dialog-report/dialog-report.component';
import { DialogTestComponent } from './dialog-test/dialog-test.component';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient/patient.component';
import { ReportComponent } from './report/report.component';
import { TestComponent } from './test/test.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    PatientComponent,
    DialogPatientComponent,
    TestComponent,
    ReportComponent,
    DialogReportComponent,
    DialogTestComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    MaterialModule,
    DialogConfirmationModule,
    FormsModule
  ],
  entryComponents: [DialogPatientComponent, DialogReportComponent, DialogTestComponent],
})
export class PatientModule {}
