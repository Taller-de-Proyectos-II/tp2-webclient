import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { ProfileRoutingModule } from './profile-routing.module'
import { ProfileComponent } from './profile/profile.component'

@NgModule({
  declarations: [ ProfileComponent ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    MaterialModule
  ]
})
export class ProfileModule { }
