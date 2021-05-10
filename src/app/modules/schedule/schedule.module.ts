import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DialogConfirmationModule } from 'src/app/shared/dialog-confirmation/dialog-confirmation.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { DialogPatientComponent } from './dialog-patient/dialog-patient.component';

@NgModule({
  declarations: [ScheduleComponent, DialogPatientComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    MaterialModule,
    DialogConfirmationModule,
  ],
  entryComponents: [DialogPatientComponent],
})
export class ScheduleModule {}
