import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pre-login/landing-page/landing-page.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { PreLoginComponent } from './pre-login/pre-login.component';
import { ModulesComponent } from './main/modules/modules.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'modules', component: ModulesComponent},
  { path: '', component: PreLoginComponent, pathMatch: 'full', children: [
    {path: '', component: LandingPageComponent, pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
