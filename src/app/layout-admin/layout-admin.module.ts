import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonsModule, NavbarModule, WavesModule } from 'angular-bootstrap-md'
import { MaterialModule } from 'src/app/shared/material/material.module';

import { FooterAdminComponent } from './footer/footer.component';
import { HeaderAdminComponent } from './header/header.component';
import { LayoutAdminComponent } from './layout.component';
import { LoadingAdminComponent } from './loading/loading.component';

@NgModule({
  declarations: [LayoutAdminComponent, FooterAdminComponent, HeaderAdminComponent, LoadingAdminComponent],
  imports: [CommonModule, MaterialModule, RouterModule, ButtonsModule, NavbarModule, WavesModule],
  exports: [LayoutAdminComponent, LoadingAdminComponent],
})
export class LayoutAdminModule {}
