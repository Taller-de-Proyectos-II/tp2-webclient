import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { DialogPasswordComponent } from './dialog-password/dialog-password.component';

@NgModule({
  declarations: [ProfileComponent, DialogPasswordComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    MaterialModule,
  ],
  entryComponents: [DialogPasswordComponent],
})
export class ProfileModule {}
