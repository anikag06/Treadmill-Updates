import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/material.module';
import {
  MatCard,
  MatCardModule,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material';
import { SharedModule } from '@/shared/shared.module';
import { MatRippleModule } from '@angular/material/core';
import {QuestionnaireContainerComponent} from "@/shared/questionnaire-container/questionnaire-container.component";
import {QuestionnaireContainerRoutingModule} from "@/shared/questionnaire-container/questionnaire-container-routing.module";

@NgModule({
  imports: [
    QuestionnaireContainerRoutingModule,
    CommonModule,
    // MaterialModule,
    SharedModule,
    MatCardModule,
    MatDialogModule,
    MatRippleModule,
    //  YouTubePlayerModule
  ],
  declarations: [
    QuestionnaireContainerComponent,

    // SafeUrlPipe,
    // TrimStringPipe
  ],
 // providers: [ExtraResourcesService],
  // exports: [SafeUrlPipe],
})
export class QuestionnaireContainerModule {}
