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


const routes: Routes = [
  {
    path: 'trial-registration', component: RegistrationStepOneComponent,
  },
  {
    path: 'trial-registration/step-2', component: RegistrationStepTwoComponent, canActivate: [TrialActivateGuard]
  },
  {
    path: 'trial-registration/step-3', component: RegistrationStepThreeComponent, canActivate: [TrialActivateGuard]
  },
  {
    path: 'trial-registration/step-4', component: RegistrationStepFourComponent, canActivate: [TrialActivateGuard]
  },
  {
    path: 'faqs', component: FaqPageComponent,
  },
  {
    path: 'terms-and-conditions', component: TermsAndConditionsComponent,
  },
  {
    path: 'privacy-policy', component: PrivacyPolicyComponent,
  },
  {
    path: 'about-us', component: AboutUsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrialRegistrationRoutingModule { }
