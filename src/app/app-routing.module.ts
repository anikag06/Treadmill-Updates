import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pre-login/landing-page/landing-page.component';
import { PreLoginComponent } from './pre-login/pre-login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { SignUpComponent } from '@/pre-login/signup/signup.component';
import { TempLandingPageComponent } from '@/temp-landing-page/temp-landing-page.component';
import { ResetPasswordComponent } from '@/pre-login/reset-password/reset-password.component';
import {TrialAiimsRegistrationComponent} from '@/trial-aiims-registration/trial-aiims-registration/trial-aiims-registration.component';
import {TrialAiimsRegistrationRoutingModule} from '@/trial-aiims-registration/trial-aiims-registration-routing.module';
import {TrialOpenRegistrationComponent} from '@/trial-aiims-registration/trial-open-registration/trial-open-registration.component';
import {
  TrialWorkPageRegistrationComponent
} from '@/trial-aiims-registration/trial-work-page-registration/trial-work-page-registration.component';
import {
  TrialStudentPageRegistrationComponent
} from '@/trial-aiims-registration/trial-student-page-registration/trial-student-page-registration.component';
import {
  TrialLifePageRegistrationComponent
} from '@/trial-aiims-registration/trial-life-page-registration/trial-life-page-registration.component';
import {
  TrialLearnPageRegistrationComponent
} from '@/trial-aiims-registration/trial-learn-page-registration/trial-learn-page-registration.component';

export const routes: Routes = [

  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'landing',
    component: PreLoginComponent,
    children: [
      {
        path: ':term',
        component: LandingPageComponent,
        pathMatch: 'full',
      },
      { path: '', component: LandingPageComponent, pathMatch: 'full' },
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
    data: { preload: true },
    canActivateChild: [AuthGuard],
  },
  {
    path: 'trial',
    loadChildren: () =>
      import('./trial-registration/trial-registration.module').then(
        m => m.TrialRegistrationModule,
      ),
  },
  { path: 'iitk', redirectTo: 'trial/trial-registration' },
  {
    path: 'aiims532',
    component: TrialAiimsRegistrationComponent,
    pathMatch: 'full',
  },
  {
    path: 'open',
    component: TrialOpenRegistrationComponent,
    pathMatch: 'full',
  },
  {
    path: 'work',
    component: TrialWorkPageRegistrationComponent,
    pathMatch: 'full',
  },
  {
    path: 'student',
    component: TrialStudentPageRegistrationComponent,
    pathMatch: 'full',
  },
  {
    path: 'life',
    component: TrialLifePageRegistrationComponent,
    pathMatch: 'full',
  },
  {
    path: 'learn',
    component: TrialLearnPageRegistrationComponent,
    pathMatch: 'full',
  },
  {
    path: 'aiims532/r',
    loadChildren: () =>
      import('./trial-aiims-registration/trial-aiims-registration.module').then(
        m => m.TrialAiimsRegistrationModule,
      ),
  },
  {
    path: 'open/r',
    loadChildren: () =>
      import('./trial-aiims-registration/trial-aiims-registration.module').then(
        m => m.TrialAiimsRegistrationModule,
      ),
  },
  {
    path: 'work/r',
    loadChildren: () =>
      import('./trial-aiims-registration/trial-aiims-registration.module').then(
        m => m.TrialAiimsRegistrationModule,
      ),
  },
  {
    path: 'student/r',
    loadChildren: () =>
      import('./trial-aiims-registration/trial-aiims-registration.module').then(
        m => m.TrialAiimsRegistrationModule,
      ),
  },
  {
    path: 'life/r',
    loadChildren: () =>
      import('./trial-aiims-registration/trial-aiims-registration.module').then(
        m => m.TrialAiimsRegistrationModule,
      ),
  },
  {
    path: 'learn/r',
    loadChildren: () =>
      import('./trial-aiims-registration/trial-aiims-registration.module').then(
        m => m.TrialAiimsRegistrationModule,
      ),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {}
