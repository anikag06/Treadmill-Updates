import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pre-login/landing-page/landing-page.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { PreLoginComponent } from './pre-login/pre-login.component';
import { ModulesComponent } from './main/modules/modules.component';
import { ModuleListComponent } from './main/modules/module-list/module-list.component';
import { ModuleDetailComponent } from './main/modules/module-detail/module-detail.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { LogoutComponent } from './shared/auth/logout/logout.component';
import { GamesComponent } from './main/games/games.component';
import { GamesListComponent } from './main/games/games-list/games-list.component';
import { SideNavComponent } from '@/main/side-nav/side-nav.component';

const routes: Routes = [
  { path: '',
    component: PreLoginComponent,
    pathMatch: 'full',
    children: [
      {path: '', component: LandingPageComponent, pathMatch: 'full'},
    ]
  },
  { path: '', component: SideNavComponent, canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      { path: 'modules', component: ModulesComponent, canActivateChild: [AuthGuard], children: [
        {path: ':name', component: ModuleDetailComponent},
        {path: '', component: ModuleListComponent},
      ]
    },
    { path: 'games', component: GamesComponent, children: [
        {path: '', component: GamesListComponent},
      ]
    },
      { path: 'logout', component: LogoutComponent },
      ]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
