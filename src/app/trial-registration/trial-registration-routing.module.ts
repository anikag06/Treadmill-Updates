import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationStepOneComponent } from './registration-step-one/registration-step-one.component';
import { RegistrationStepTwoComponent } from './registration-step-two/registration-step-two.component';
import { TrialActivateGuard } from './shared/trial-activate.guard';
import { RegistrationStepThreeComponent } from './registration-step-three/registration-step-three.component';


const routes: Routes = [
  {
    path: 'trial-registration', component: RegistrationStepOneComponent,
  },
  {
    path: 'trial-registration/step-2', component: RegistrationStepTwoComponent, canActivate: [TrialActivateGuard]
  },
  {
    path: 'trial-registration/step-3', component: RegistrationStepThreeComponent, canActivate: [TrialActivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrialRegistrationRoutingModule { }
