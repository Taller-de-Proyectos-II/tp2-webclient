import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonsModule, NavbarModule, WavesModule } from 'angular-bootstrap-md'
import { MaterialModule } from 'src/app/shared/material/material.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [LayoutComponent, FooterComponent, HeaderComponent, LoadingComponent],
  imports: [CommonModule, MaterialModule, RouterModule, ButtonsModule, NavbarModule, WavesModule],
  exports: [LayoutComponent, LoadingComponent],
})
export class LayoutModule {}
