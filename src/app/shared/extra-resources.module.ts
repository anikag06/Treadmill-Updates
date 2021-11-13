import { NgModule } from '@angular/core';
import { ExtraResourcesRoutingModule } from '@/main/extra-resources/extra-resources-routing.module';
import { ExtraResourcesComponent } from '@/main/extra-resources/extra-resources.component';
import { VideosComponent } from '@/main/extra-resources/videos/videos.component';
import { ReadingMaterialComponent } from '@/main/extra-resources/reading-material/reading-material.component';
import { ReadingItemComponent } from '@/main/extra-resources/reading-material/reading-item/reading-item.component';
import { VideoItemComponent } from '@/main/extra-resources/videos/video-item/video-item.component';
import { CommonModule } from '@angular/common';
import { ExtraResourcesService } from '@/main/extra-resources/extra-resources.service';
import { MatCardModule, MatDialogModule } from '@angular/material';
import { SharedModule } from '@/shared/shared.module';
import { MatRippleModule } from '@angular/material/core';
import {QuestionnaireContainerModule} from "@/questionnaire-container.module";

@NgModule({
    imports: [
        ExtraResourcesRoutingModule,
        CommonModule,
        SharedModule,
        MatCardModule,
        MatDialogModule,
        MatRippleModule,
        QuestionnaireContainerModule,
    ],
  declarations: [
    ExtraResourcesComponent,
    VideosComponent,
    ReadingMaterialComponent,
    ReadingItemComponent,
    VideoItemComponent,
  ],
  providers: [ExtraResourcesService],
})
export class ExtraResourcesModule {}
