import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pre-login/landing-page/landing-page.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { PreLoginComponent } from './pre-login/pre-login.component';
import { ModulesComponent } from './main/modules/modules.component';
import { ModuleListComponent } from './main/modules/module-list/module-list.component';
import { ModuleDetailComponent } from './main/modules/module-detail/module-detail.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'modules', component: ModulesComponent, children: [
      {path: ':name', component: ModuleDetailComponent},
      {path: '', component: ModuleListComponent},
    ]
  },
  { path: '', component: PreLoginComponent, pathMatch: 'full', children: [
      {path: '', component: LandingPageComponent, pathMatch: 'full'},
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
