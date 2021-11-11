import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from '@/main/extra-resources/videos/videos.component';
import { VideoItemComponent } from '@/main/extra-resources/videos/video-item/video-item.component';
import { ReadingItemComponent } from '@/main/extra-resources/reading-material/reading-item/reading-item.component';
import { NgModule } from '@angular/core';
import { ExtraResourcesComponent } from '@/main/extra-resources/extra-resources.component';
import { QuestionnaireItemComponent } from '@/shared/questionnaire/questionnaire-item/questionnaire-item.component';
import { QuestionnaireComponent } from '@/shared/questionnaire/questionnaire.component';

export const extraResourcesRoutes: Routes = [
  {
    path: '',
    component: ExtraResourcesComponent,
    data: { title: 'Resources' },
    children: [
      { path: 'videos', component: VideosComponent },
      { path: 'videoItem/:id', component: VideoItemComponent },
      { path: 'readingItem/:id', component: ReadingItemComponent },
      { path: 'mindfulnessVideo/:id', component: VideoItemComponent },
      { path: 'videoCovid19/:id', component: VideoItemComponent },
      { path: 'usefulList/:id', component: ReadingItemComponent },
      {
        path: 'questionnaireItem/:id',
        component: QuestionnaireItemComponent,
        data: { registered_user: true },
      },
    ],
  },
  {
    path: ':id',
    component: ExtraResourcesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(extraResourcesRoutes)],
  exports: [RouterModule],
})
export class ExtraResourcesRoutingModule {}
