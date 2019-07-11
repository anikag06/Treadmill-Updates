import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import {ProblemSolvingWorksheetsComponent} from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import {FormsListComponent} from '@/main/resources/forms/forms-list/forms-list.component';
import {TaskFormsComponent} from '@/main/resources/forms/task-forms/task-forms.component';
import { SlidesComponent } from './slides/slides.component';


export const formRoutes: Routes = [
  { path: '', component: FormsComponent, children: [
      { path: '', component: FormsListComponent },
      { path: 'problem-solving', component: ProblemSolvingWorksheetsComponent },
      { path: 'tasks', component: TaskFormsComponent },
      { path: 'slides', component: SlidesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(formRoutes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
