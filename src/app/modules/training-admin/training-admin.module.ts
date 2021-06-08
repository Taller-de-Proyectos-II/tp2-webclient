import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutAdminModule } from 'src/app/layout-admin/layout-admin.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { TrainingAdminRoutingModule } from './training-admin-routing.module';
import { TrainingAdminComponent } from './training-admin/training-admin.component';

@NgModule({
  declarations: [TrainingAdminComponent],
  imports: [
    CommonModule,
    TrainingAdminRoutingModule,
    MaterialModule,
    LayoutAdminModule,
    ReactiveFormsModule
  ]
})
export class TrainingAdminModule { }
