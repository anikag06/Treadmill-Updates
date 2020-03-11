import { NgModule } from '@angular/core';
import { Resources2RoutingModule } from '@/main/resources2/resources2-routing.module';
import { Resources2Component } from '@/main/resources2/resources2.component';
import { VideosComponent } from '@/main/resources2/videos/videos.component';
import { ReadingMaterialComponent } from '@/main/resources2/reading-material/reading-material.component';
import { ReadingItemComponent } from '@/main/resources2/reading-material/reading-item/reading-item.component';
import { VideoItemComponent } from '@/main/resources2/videos/video-item/video-item.component';
import { SafeUrlPipe } from '@/main/resources2/safe-url.pipe';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/material.module';
import { Resources2Service } from '@/main/resources2/resources2.service';
import { MatCard, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    Resources2RoutingModule,
    CommonModule,
    // MaterialModule,
    MatCardModule,
  ],
  declarations: [
    Resources2Component,
    VideosComponent,
    ReadingMaterialComponent,
    ReadingItemComponent,
    VideoItemComponent,
    SafeUrlPipe,
  ],
  providers: [Resources2Service],
})
export class Resources2Module {}
