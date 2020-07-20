import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pre-login/landing-page/landing-page.component';
import { PreLoginComponent } from './pre-login/pre-login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { SignUpComponent } from '@/pre-login/signup/signup.component';
import { TempLandingPageComponent } from '@/temp-landing-page/temp-landing-page.component';
import { ResetPasswordComponent } from '@/pre-login/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    component: PreLoginComponent,
    children: [
      {
        path: 'landing/:term',
        component: LandingPageComponent,
        pathMatch: 'full',
      },
      { path: 'landing', component: LandingPageComponent, pathMatch: 'full' },
    ],
  },
  {
    path: 'sign-up/:unique-code',
    component: SignUpComponent,
    pathMatch: 'prefix',
  },

  {
    path: 'reset/password/:unique-code',
    component: ResetPasswordComponent,
    pathMatch: 'prefix',
    // canActivate: [ResetPasswordAuth],
  },

  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'trial',
    loadChildren: () =>
      import('./trial-registration/trial-registration.module').then(
        m => m.TrialRegistrationModule,
      ),
  },
  { path: 'iitk', component: TempLandingPageComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
