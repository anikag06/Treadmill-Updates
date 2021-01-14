import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationStepOneComponent } from './registration-step-one/registration-step-one.component';
import { RegistrationStepTwoComponent } from './registration-step-two/registration-step-two.component';
import { TrialActivateGuard } from './shared/trial-activate.guard';
import { RegistrationStepThreeComponent } from './registration-step-three/registration-step-three.component';
import { RegistrationStepFourComponent } from './registration-step-four/registration-step-four.component';
import { FaqPageComponent } from './information-pages/faq-page/faq-page.component';
import { TermsAndConditionsComponent } from './information-pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './information-pages/privacy-policy/privacy-policy.component';
import { AboutUsPageComponent } from './information-pages/about-us-page/about-us-page.component';
import { TrialRegistrationAuthGuard } from '@/shared/auth/trial-registration-auth.guard';
import { IneligibleTrialPageComponent } from './information-pages/ineligible-trial-page/ineligible-trial-page.component';
import { StepLastPageComponent } from './information-pages/step-last-page/step-last-page.component';
import { ReregistrationComponent } from '@/trial-registration/reregistration/reregistration.component';
import { WaitlistComponent } from '@/trial-registration/waitlist/waitlist.component';
import {RegistrationStepOneNextComponent} from '@/trial-registration/registration-step-one-next/registration-step-one-next.component';

const routes: Routes = [
  {
    path: 'trial-registration',
    component: RegistrationStepOneComponent,
    canActivate: [TrialRegistrationAuthGuard],
  },
  {
    path: 'trial-registration/step-1',
    component: RegistrationStepOneNextComponent,
    canActivate: [TrialActivateGuard],
  },

  {
    path: 'trial-registration/step-2',
    component: RegistrationStepTwoComponent,
    canActivate: [TrialActivateGuard],
  },
  {
    path: 'trial-registration/step-3',
    component: RegistrationStepThreeComponent,
    canActivate: [TrialActivateGuard],
  },
  {
    path: 'trial-registration/step-4',
    component: RegistrationStepFourComponent,
    canActivate: [TrialActivateGuard],
  },
  {
    path: 'trial-registration/step-5',
    component: StepLastPageComponent,
    canActivate: [TrialActivateGuard],
  },
  {
    path: 'trial-registration/:unique_code',
    component: ReregistrationComponent,
    pathMatch: 'prefix',
    // canActivate: [TrialActivateGuard],
  },
  {
    path: 'listwait/:unique-code',
    component: WaitlistComponent,
    pathMatch: 'prefix',
  },
  {
    path: 'faqs',
    component: FaqPageComponent,
    canActivate: [TrialRegistrationAuthGuard],
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent,
    canActivate: [TrialRegistrationAuthGuard],
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    canActivate: [TrialRegistrationAuthGuard],
  },
  {
    path: 'about-us',
    component: AboutUsPageComponent,
    canActivate: [TrialRegistrationAuthGuard],
  },
  {
    path: 'thankyou',
    component: IneligibleTrialPageComponent,
    // canActivate: [TrialActivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrialRegistrationRoutingModule {}
