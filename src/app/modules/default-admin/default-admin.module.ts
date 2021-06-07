import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultAdminRoutingModule } from './default-admin-routing.module';
import { DefaultAdminComponent } from './default-admin/default-admin.component';
import { LayoutAdminModule } from 'src/app/layout-admin/layout-admin.module';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [DefaultAdminComponent],
  imports: [
    CommonModule,
    DefaultAdminRoutingModule,
    MaterialModule,
    LayoutAdminModule
  ]
})
export class DefaultAdminModule { }
