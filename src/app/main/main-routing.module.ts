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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
