/**
 * importing all the material elements to be used in this project
 */

import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatTooltipModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSidenavModule,
  MatSelectModule,
  MatSnackBarModule,
  MatListModule,
  MatTabsModule,
  MatSliderModule,
  MatExpansionModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSidenavModule,
    MatSelectModule,
    MatSnackBarModule,
    MatListModule,
    MatTabsModule,
    MatSliderModule,
    MatExpansionModule
  ],
  exports: [
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSidenavModule,
    MatSelectModule,
    MatSnackBarModule,
    MatListModule,
    MatTabsModule,
    MatSliderModule,
    MatExpansionModule
  ],
})
export class MaterialModule {}
