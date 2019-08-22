import { Component, OnInit, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { SlideService } from './slide.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormDirective } from './form.directive';
import { ProblemSolvingWorksheetsComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import { TaskFormsComponent } from '../forms/task-forms/task-forms.component';
import { Slide } from './Slide.model';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit, AfterViewInit {

  @ViewChild(FormDirective, {static: false}) formHost!: FormDirective;

  constructor(
    private slideService: SlideService,
    private sanitizer: DomSanitizer,
    private componentFactoryResolver: ComponentFactoryResolver,
    private activateRoute: ActivatedRoute,
  ) { }

  slide!: Slide;
  sanitizedUrl!: SafeUrl;

  ngOnInit() {
    this.activateRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id => this.slideService.getSlide(parseInt(id)))
      )
      .subscribe(
        (data: any) => {
          this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
          this.slide = <Slide>data;
        }
      );
  }

  ngAfterViewInit() {
    this.activateRoute
      .queryParams.subscribe(params => {
        const formName = params['form'];
        console.log(formName);
        if (formName === 'problem-solving-from') {
          this.loadForm(ProblemSolvingWorksheetsComponent);
        } else if (formName === 'task-from') {
          this.loadForm(TaskFormsComponent);
        }
      });
  }



  loadForm(component: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.formHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }
}
