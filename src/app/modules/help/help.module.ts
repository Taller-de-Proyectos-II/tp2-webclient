import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [HelpComponent],
  imports: [
    CommonModule,
    HelpRoutingModule,
    MaterialModule,
    LayoutModule
  ]
})
export class HelpModule { }
