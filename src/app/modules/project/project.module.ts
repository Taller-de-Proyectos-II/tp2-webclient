import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutModule } from '../../layout/layout.module';
import { ProjectPrincipalComponent } from './project-principal/project-principal.component';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  declarations: [ProjectPrincipalComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    LayoutModule
  ]
})
export class ProjectModule { }
