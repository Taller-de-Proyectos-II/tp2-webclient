import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  providers: [
    MatDatepickerModule,
    MatSnackBarModule,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { disableClose: true, hasBackdrop: true },
    },
  ],
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTreeModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatDialogModule,
    MatTabsModule,
    MatRadioModule,
  ],
  exports: [
    MatToolbarModule,
    MatTreeModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatDialogModule,
    MatTabsModule,
    MatRadioModule,
  ],
})
export class MaterialModule {}
