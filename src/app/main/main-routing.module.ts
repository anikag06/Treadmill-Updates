import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '@/shared/auth/auth.guard';
import { SupportGroupsComponent } from './support-groups/support-groups.component';
import { GamesComponent } from './games/games.component';
import { GamesListComponent } from './games/games-list/games-list.component';
import { LogoutComponent } from '@/shared/auth/logout/logout.component';
import { MainComponent } from './main.component';
// import { FormsComponent } from './forms/forms.component';
import { ScoreComponent } from './score/score.component';
import { PhqNineComponent } from './score/phq-nine/phq-nine.component';
import { GadSevenComponent } from './score/gad-seven/gad-seven.component';
import { CommonGameComponent } from './games/games-list/common-game/common-game.component';

import { ConversationsComponent } from './resources/conversation-group/conversations/conversations.component';
import { ConversationGroupComponent } from './resources/conversation-group/conversation-group.component';
import { GetQuestionnaireComponent } from './dashboard/get-questionnaire/get-questionnaire.component';
import { SurveyComponent } from './shared/survey/survey.component';
import { Resources2Component } from '@/main/resources2/resources2.component';
import { ReadingItemComponent } from '@/main/resources2/reading-material/reading-item/reading-item.component';
import { VideoItemComponent } from '@/main/resources2/videos/video-item/video-item.component';
import { VideosComponent } from '@/main/resources2/videos/videos.component';
import { ReadingMaterialComponent } from '@/main/resources2/reading-material/reading-material.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Hello ' },
      },
      { path: 'questionnaire', component: GetQuestionnaireComponent },
      { path: 'survey', component: SurveyComponent }, // :id here is step_id
      {
        path: 'support-groups',
        component: SupportGroupsComponent,
        data: { title: 'Support Group' },
      },
      {
        path: 'games',
        component: GamesComponent,
        data: { title: 'Games' },
        children: [
          { path: '', component: GamesListComponent },
          // { path: 'interpretationbias', component: InterpretationBiasGameComponent},
          { path: ':name', component: CommonGameComponent },
        ],
      },
      {
        path: 'scores',
        component: ScoreComponent,
        data: { title: 'Questionnaire Scores' },
        children: [
          { path: 'phq', component: PhqNineComponent },
          { path: 'gad', component: GadSevenComponent },
        ],
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'logout', component: LogoutComponent },
      {
        path: 'resources',
        loadChildren: () =>
          import('./resources/resources.module').then(
            mod => mod.ResourcesModule,
          ),
        canActivateChild: [AuthGuard],
      },
      {
        path: 'resources2',
        // component: Resources2Component,
        // children: [
        //   { path: 'videos', component: VideosComponent },
        //   // {path: 'readingItem', component: ReadingMaterialComponent}
        //   { path: 'videoItem/:id', component: VideoItemComponent },
        //   {path: 'readingItem/:id', component: ReadingItemComponent}
        // ],
        loadChildren: () => import('./resources2/resources2.module').then(m =>
        m.Resources2Module)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  //imports: [RouterModule.forRoot(mainRoutes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class MainRoutingModule {}

