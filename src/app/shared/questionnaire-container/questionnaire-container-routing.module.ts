import {NgModule} from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import {QuestionnaireContainerComponent} from "@/shared/questionnaire-container/questionnaire-container.component";

export const questionnaireContainerRoutes: Routes = [
  {
    path: '', component: QuestionnaireContainerComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(questionnaireContainerRoutes)],
  exports: [RouterModule],
})

export class QuestionnaireContainerRoutingModule{

}
