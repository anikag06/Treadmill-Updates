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
import { FormsComponent } from './forms/forms.component';
import {ProblemSolvingWorksheetsComponent} from '@/main/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import {FormsListComponent} from '@/main/forms/forms-list/forms-list.component';
import {TasksComponent} from '@/main/forms/problem-solving-worksheets/tasks/tasks.component';


export const mainRoutes: Routes = [
    {
        path: '', component: MainComponent, canActivateChild: [AuthGuard], children: [
            { path: 'dashboard', component: DashboardComponent, },
            { path: 'support-groups', component: SupportGroupsComponent },
            { path: 'forms', component: FormsComponent, children: [
                { path: '', component: FormsListComponent },
                { path: 'problem-solving', component: ProblemSolvingWorksheetsComponent },
                { path: 'tasks', component: TasksComponent }
              ]
            },
            {
                path: 'modules', component: ModulesComponent, canActivateChild: [AuthGuard], children: [
                    { path: ':name', component: ModuleDetailComponent },
                    { path: '', component: ModuleListComponent },
                ]
            },
            {
                path: 'games', component: GamesComponent, children: [
                    { path: '', component: GamesListComponent },
                ]
            },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
            { path: 'logout', component: LogoutComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
