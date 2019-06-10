import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import {ProblemSolvingWorksheetsComponent} from '@/main/custom-forms/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import {FormsListComponent} from '@/main/custom-forms/forms/forms-list/forms-list.component';
import {TaskFormsComponent} from '@/main/custom-forms/forms/task-forms/task-forms.component';


export const formRoutes: Routes = [
  { path: '', component: FormsComponent, children: [
      { path: '', component: FormsListComponent },
      { path: 'problem-solving', component: ProblemSolvingWorksheetsComponent },
      { path: 'tasks', component: TaskFormsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(formRoutes)],
  exports: [RouterModule]
})
export class CustomFormsRoutingModule { }
