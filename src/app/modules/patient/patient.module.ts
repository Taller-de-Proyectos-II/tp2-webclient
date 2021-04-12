import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';
import { LayoutModule } from '../../layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { PatientComponent } from './patient/patient.component';
import { DialogConfirmationModule } from 'src/app/shared/dialog-confirmation/dialog-confirmation.module';
import { DialogPatientComponent } from './dialog-patient/dialog-patient.component';
import { TestComponent } from './test/test.component';
import { ReportComponent } from './report/report.component';
import { DialogReportComponent } from './dialog-report/dialog-report.component';

@NgModule({
  declarations: [
    PatientComponent,
    DialogPatientComponent,
    TestComponent,
    ReportComponent,
    DialogReportComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    MaterialModule,
    DialogConfirmationModule,
  ],
  entryComponents: [DialogPatientComponent, DialogReportComponent],
})
export class PatientModule {}
