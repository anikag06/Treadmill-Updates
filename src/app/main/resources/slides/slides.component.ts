import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { SlideService } from './slide.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormDirective } from './form.directive';
import { ProblemSolvingWorksheetsComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import { TaskFormsComponent } from '../forms/task-forms/task-forms.component';
import { Slide } from './Slide.model';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { SLIDE } from '@/app.constants';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {

  @ViewChild(FormDirective, {static: false}) formHost!: FormDirective;

  constructor(
    private slideService: SlideService,
    private sanitizer: DomSanitizer,
    private componentFactoryResolver: ComponentFactoryResolver,
    private activateRoute: ActivatedRoute,
  ) { }

  slide!: Slide;
  sanitizedUrl!: SafeUrl;
  status!: string;
  notAvailable = false;

  ngOnInit() {
    this.activateRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id => this.slideService.getSlide(parseInt(id, 10)))
      )
      .subscribe(
        (data: any) => {
          const step = data.data;
          console.log(step)
          if (['COMPLETED', 'WORKING', 'UNLOCKED'].includes(step.status) && step.data_type === SLIDE) {
            this.slide = <Slide>step.step_data.data;
            this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.slide.url);
            const formName = step.action[0];
            if (formName === 'problem-solving') {
              setTimeout(() => this.loadForm(ProblemSolvingWorksheetsComponent), 1000);
            } else if (formName === 'task') {
              setTimeout(() => this.loadForm(TaskFormsComponent), 1000);
            }
          } else {
            this.notAvailable = true;
          }
        }
      );
    }



  loadForm(component: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.formHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }
}
