import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
