import { Component, OnInit, ViewChild, ComponentFactoryResolver, HostListener, ElementRef } from '@angular/core';
import { SlideService } from './slide.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormDirective } from './form.directive';
import { ProblemSolvingWorksheetsComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import { TaskFormsComponent } from '../forms/task-forms/task-forms.component';
import { Slide } from './Slide.model';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('hidden', style({ display: 'none'})),
      state('show', style({ display: 'block'})),
      transition('hidden => show', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-out', style({transform: 'translateX(0%)'}))
      ]),
      transition('show => hidden', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ]),
    trigger('formInOut', [
      state('hidden', style({ display: 'none'})),
      state('show', style({ display: 'block'})),
      transition('hidden => show', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-out', style({transform: 'translateX(0%)'}))
      ]),
      transition('show => hidden', [
        animate('200ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class SlidesComponent implements OnInit {

  @ViewChild(FormDirective, {static: false}) formHost!: FormDirective;
  @ViewChild('form_div', {static: false}) formDiv!: ElementRef;
  @ViewChild('slideDiv', {static: false}) slideDiv!: ElementRef;

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
  visible = true;
  isFormVisible = true;
  isSlidesVisible = true;
  isDislikeBox = false;

  ngOnInit() {
    this.activateRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id => this.slideService.getSlide(parseInt(id, 10)))
      )
      .subscribe(
        (data: any) => {
            if (['COMPLETED', 'WORKING', 'UNLOCKED'].includes(data.data.status) && data.data.step_data.type === 'Slide' ) {
            this.slide = <Slide>data.data.step_data.data;
            this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.slide.url);
            const formName = data.data.action[0];
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
    if (window.matchMedia('(max-width: 992px)').matches) {
      this.isFormVisible = false;
    } else {
      this.isFormVisible = true;
      this.formDiv.nativeElement.classList.add('col-4');
      this.slideDiv.nativeElement.classList.add('col-5');
    }
  }

  onDislikeBtnClick() {
    this.isDislikeBox = !this.isDislikeBox;
  }

  onShowForm() {
    this.visible = !this.visible;
    console.log('form', this.visible);
    this.isFormVisible = true;
    this.isSlidesVisible = false;
  }

  onShowSlides() {
    this.visible = !this.visible;
    console.log('slides', this.visible);
    this.isSlidesVisible = true;
    this.isFormVisible = false;
  }

}
