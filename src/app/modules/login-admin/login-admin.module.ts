import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutAdminModule } from 'src/app/layout-admin/layout-admin.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { LoginAdminRoutingModule } from './login-admin-routing.module';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    LoginAdminComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    LoginAdminRoutingModule,
    ReactiveFormsModule,
    LayoutAdminModule,
    MaterialModule,
  ]
})
export class LoginAdminModule { }
