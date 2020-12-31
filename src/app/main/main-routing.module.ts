import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '@/shared/auth/auth.guard';
import { SupportGroupsComponent } from './support-groups/support-groups.component';
import { GamesComponent } from './games/games.component';
import { GamesListComponent } from './games/games-list/games-list.component';
import { LogoutComponent } from '@/shared/auth/logout/logout.component';
import { MainComponent } from './main.component';
import { ScoreComponent } from './score/score.component';
import { PhqNineComponent } from './score/phq-nine/phq-nine.component';
import { GadSevenComponent } from './score/gad-seven/gad-seven.component';
import { CommonGameComponent } from './games/games-list/common-game/common-game.component';
import { GetQuestionnaireComponent } from './dashboard/get-questionnaire/get-questionnaire.component';
import { SurveyComponent } from './shared/survey/survey.component';
import { NeedToTalkComponent } from '@/main/need-to-talk/need-to-talk.component';
import { SettingsComponent } from '@/main/settings/settings.component';
import { ResetPasswordComponent } from '@/pre-login/reset-password/reset-password.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Home' },
      },
      { path: 'questionnaire', component: GetQuestionnaireComponent },
      { path: 'survey', component: SurveyComponent }, // :id here is step_id
      { path: 'survey/:id', component: SurveyComponent }, // :id here is step_id
      {
        path: 'support-groups',
        component: SupportGroupsComponent,
        data: { title: 'Support Group' },
      },
      {
        path: 'need-to-talk',
        component: NeedToTalkComponent,
        data: { title: 'Need to talk' },
      },
      {
        path: 'support-groups/:id',
        component: SupportGroupsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: { title: 'Settings' },
        children: [
          {
            path: ':name',
            component: SettingsComponent,
            data: { title: '' },
          },
        ],
      },
      {
        path: 'games',
        component: GamesComponent,
        data: { title: 'Games' },
        children: [
          { path: '', component: GamesListComponent },
          { path: ':name', component: CommonGameComponent },
          { path: ':name/:id', component: CommonGameComponent },
        ],
      },
      {
        path: 'scores',
        component: ScoreComponent,
        data: { title: 'Questionnaire Scores' },
        children: [
          {
            path: 'phq',
            component: PhqNineComponent,
            data: { title: 'Questionnaire Scores' },
          },
          {
            path: 'gad',
            component: GadSevenComponent,
            data: { title: 'Questionnaire Scores' },
          },
        ],
      },
      { path: '', redirectTo: '/main/dashboard', pathMatch: 'full' },
      { path: 'logout', component: LogoutComponent },
      {
        path: 'resources',
        loadChildren: () =>
          import('./resources/resources.module').then(m => m.ResourcesModule),
      },
      {
        path: 'extra-resources',
        loadChildren: () =>
          import('../shared/extra-resources.module').then(
            m => m.ExtraResourcesModule,
          ),
      },
      {
        path: 'extra-resources/:id',
        loadChildren: () =>
          import('../shared/extra-resources.module').then(
            m => m.ExtraResourcesModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
