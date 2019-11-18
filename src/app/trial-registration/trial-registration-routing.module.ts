import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationStepOneComponent } from './registration-step-one/registration-step-one.component';


const routes: Routes = [
  {
    path: 'trial-registration', component: RegistrationStepOneComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrialRegistrationRoutingModule { }
