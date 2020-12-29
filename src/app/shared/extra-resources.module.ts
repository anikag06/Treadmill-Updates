import { NgModule } from '@angular/core';
import { ExtraResourcesRoutingModule } from '@/main/extra-resources/extra-resources-routing.module';
import { ExtraResourcesComponent } from '@/main/extra-resources/extra-resources.component';
import { VideosComponent } from '@/main/extra-resources/videos/videos.component';
import { ReadingMaterialComponent } from '@/main/extra-resources/reading-material/reading-material.component';
import { ReadingItemComponent } from '@/main/extra-resources/reading-material/reading-item/reading-item.component';
import { VideoItemComponent } from '@/main/extra-resources/videos/video-item/video-item.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/material.module';
import { ExtraResourcesService } from '@/main/extra-resources/extra-resources.service';
import {
  MatCard,
  MatCardModule,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material';
import { SharedModule } from '@/shared/shared.module';
import {MatRippleModule} from "@angular/material/core";
//import {YouTubePlayerModule} from '@angular/youtube-player';
//import { TrimStringPipe} from '@/main/shared/trim-string.pipe';

@NgModule({
    imports: [
        ExtraResourcesRoutingModule,
        CommonModule,
        // MaterialModule,
        SharedModule,
        MatCardModule,
        MatDialogModule,
        MatRippleModule,
        //  YouTubePlayerModule
    ],
  declarations: [
    ExtraResourcesComponent,
    VideosComponent,
    ReadingMaterialComponent,
    ReadingItemComponent,
    VideoItemComponent,

    // SafeUrlPipe,
    // TrimStringPipe
  ],
  providers: [ExtraResourcesService],
  // exports: [SafeUrlPipe],
})
export class ExtraResourcesModule {}
