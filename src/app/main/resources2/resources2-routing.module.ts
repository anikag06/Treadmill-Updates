import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from '@/main/resources2/videos/videos.component';
import { VideoItemComponent } from '@/main/resources2/videos/video-item/video-item.component';
import { ReadingItemComponent } from '@/main/resources2/reading-material/reading-item/reading-item.component';
import { NgModule } from '@angular/core';
import { Resources2Component } from '@/main/resources2/resources2.component';

export const resources2Routes: Routes = [
  {
    path: '',
    component: Resources2Component,
    children: [
      { path: 'videos', component: VideosComponent },
      // {path: 'readingItem', component: ReadingMaterialComponent}
      { path: 'videoItem/:id', component: VideoItemComponent },
      { path: 'readingItem/:id', component: ReadingItemComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(resources2Routes)],
  exports: [RouterModule],
})
export class Resources2RoutingModule {}
