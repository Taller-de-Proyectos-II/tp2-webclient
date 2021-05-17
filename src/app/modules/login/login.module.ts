import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';

import { LayoutModule } from '../../layout/layout.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DialogPolicityComponent } from './dialog-policity/dialog-policity.component';
import { DialogConsentComponent } from './dialog-consent/dialog-consent.component';
import { DialogCovidComponent } from './dialog-covid/dialog-covid.component';

@NgModule({
  declarations: [
    LoginComponent,
    WelcomeComponent,
    ForgetPasswordComponent,
    RegisterComponent,
    DialogPolicityComponent,
    DialogConsentComponent,
    DialogCovidComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    MaterialModule,
  ],
  entryComponents: [DialogPolicityComponent, DialogConsentComponent, DialogCovidComponent],
})
export class LoginModule {}
