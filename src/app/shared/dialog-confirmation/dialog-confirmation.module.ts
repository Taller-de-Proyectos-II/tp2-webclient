import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmationComponent } from './dialog-confirmation.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [DialogConfirmationComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [DialogConfirmationComponent]
})
export class DialogConfirmationModule { }
