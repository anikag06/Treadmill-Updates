import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodeComponent } from '@/shared/qr-code/qr-code.component';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    QrCodeComponent,
  ],
  imports: [CommonModule,
          MatButtonModule,
  ],
  exports: [
    QrCodeComponent
  ],
  providers: [],
})

export class QuestionnaireModule {}
