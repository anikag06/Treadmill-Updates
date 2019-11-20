import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import { LandingPageComponent } from './pre-login/landing-page/landing-page.component';
import { PreLoginComponent } from './pre-login/pre-login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  { path: 'landing',
    component: PreLoginComponent,
    pathMatch: 'full',
    children: [
      {path: '', component: LandingPageComponent, pathMatch: 'full'},
    ]
  },
  { path: '', loadChildren: './main/main.module#MainModule', canActivateChild: [AuthGuard] },
  { path: '', loadChildren: './trial-registration/trial-registration.module#TrialRegistrationModule'},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
