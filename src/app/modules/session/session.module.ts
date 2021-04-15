import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionComponent } from './session/session.component';
import { SessionRoutingModule } from './sesion-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DialogConfirmationModule } from 'src/app/shared/dialog-confirmation/dialog-confirmation.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DialogSessionComponent } from './dialog-session/dialog-session.component';



@NgModule({
  declarations: [SessionComponent, DialogSessionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    MaterialModule,
    DialogConfirmationModule,
    SessionRoutingModule
  ],
  entryComponents: [
    DialogSessionComponent
  ]
})
export class SessionModule { }
