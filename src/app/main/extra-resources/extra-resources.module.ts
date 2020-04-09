import {NgModule} from '@angular/core';
import {ExtraResourcesRoutingModule} from '@/main/extra-resources/extra-resources-routing.module';
import {ExtraResourcesComponent} from '@/main/extra-resources/extra-resources.component';
import {VideosComponent} from '@/main/extra-resources/videos/videos.component';
import {ReadingMaterialComponent} from '@/main/extra-resources/reading-material/reading-material.component';
import {ReadingItemComponent} from '@/main/extra-resources/reading-material/reading-item/reading-item.component';
import {VideoItemComponent} from '@/main/extra-resources/videos/video-item/video-item.component';
import {SafeUrlPipe} from '@/main/extra-resources/safe-url.pipe';
import {CommonModule} from '@angular/common';
import {ExtraResourcesService} from '@/main/extra-resources/extra-resources.service';
import {MatCardModule} from '@angular/material';

@NgModule({
  imports: [
    ExtraResourcesRoutingModule,
    CommonModule,
    // MaterialModule,
    MatCardModule,
  ],
  declarations: [
    ExtraResourcesComponent,
    VideosComponent,
    ReadingMaterialComponent,
    ReadingItemComponent,
    VideoItemComponent,
    SafeUrlPipe,
  ],
  providers: [ExtraResourcesService],
  exports: [SafeUrlPipe],
})
export class ExtraResourcesModule {}
