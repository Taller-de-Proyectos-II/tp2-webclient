import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralViewComponent } from './general-view/general-view.component';
import { GeneralViewRoutingModule } from './general-view-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '../../shared/material/material.module';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [GeneralViewComponent],
  imports: [
    CommonModule,
    GeneralViewRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    MaterialModule,
    FormsModule,
    ChartsModule
  ],
})
export class GeneralViewModule {}
