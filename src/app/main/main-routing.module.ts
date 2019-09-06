import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '@/shared/auth/auth.guard';
import { SupportGroupsComponent } from './support-groups/support-groups.component';
import { ModulesComponent } from './modules/modules.component';
import { ModuleDetailComponent } from './modules/module-detail/module-detail.component';
import { ModuleListComponent } from './modules/module-list/module-list.component';
import { GamesComponent } from './games/games.component';
import { GamesListComponent } from './games/games-list/games-list.component';
import { LogoutComponent } from '@/shared/auth/logout/logout.component';
import { MainComponent } from './main.component';
// import { FormsComponent } from './forms/forms.component';
import { ScoreComponent } from './score/score.component';
import { PhqNineComponent } from './score/phq-nine/phq-nine.component';
import { GadSevenComponent } from './score/gad-seven/gad-seven.component';
// tslint:disable-next-line:max-line-length
import { InterpretationBiasGameComponent } from './games/games-list/common-game/interpretation-bias-game/interpretation-bias-game.component';
import { ExecutiveControlGameComponent } from './games/games-list/common-game/executive-control-game/executive-control-game.component';
import { CommonGameComponent } from './games/games-list/common-game/common-game.component';
import { QuestionnaireComponent } from './dashboard/questionnaire/questionnaire.component';
import { ConversationsComponent } from './conversation-group/conversations/conversations.component';
import { ConversationGroupComponent } from './conversation-group/conversation-group.component';



export const mainRoutes: Routes = [
    {
        path: '', component: MainComponent, canActivateChild: [AuthGuard], children: [
            { path: 'dashboard', component: DashboardComponent},
            { path: 'conversations', component: ConversationsComponent},
            { path: 'conversations-group', component: ConversationGroupComponent},
            { path: 'questionnaire', component: QuestionnaireComponent},
            { path: 'support-groups', component: SupportGroupsComponent },
            {
                path: 'modules', component: ModulesComponent, canActivateChild: [AuthGuard], children: [
                    { path: ':name', component: ModuleDetailComponent },
                    { path: '', component: ModuleListComponent },
                ]
            },
            {
                path: 'games', component: GamesComponent, children: [
                    { path: '', component: GamesListComponent },
                    // { path: 'interpretationbias', component: InterpretationBiasGameComponent},
                    { path: ':name', component: CommonGameComponent}
                ]
            },
            {
                path: 'scores', component: ScoreComponent, children: [
                    { path: 'phq', component: PhqNineComponent },
                    { path: 'gad', component: GadSevenComponent }
                ]
            },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'logout', component: LogoutComponent },
            {
                path: 'resources',
                loadChildren: () => import('./resources/resources.module').then(mod => mod.ResourcesModule),
                canActivateChild: [AuthGuard]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule {
}
