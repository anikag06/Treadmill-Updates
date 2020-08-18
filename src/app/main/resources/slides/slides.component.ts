import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ElementRef,
  AfterContentInit,
} from '@angular/core';
import { SlideService } from './slide.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormDirective } from './form.directive';
import { ProblemSolvingWorksheetsComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import { TaskFormsComponent } from '../forms/task-forms/task-forms.component';
import { Slide } from './Slide.model';
import { SlidesFeedback, SlidesFeedbackText } from './slide.feedback.model';
import { StepCompleteData } from '../shared/completion-data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import {
  SLIDE,
  FORM_PROBLEM_SOLVING,
  FORM_TASK,
  COMPLETED,
  ACTIVE,
  SHOW_MINDFULNESS_VIDEO,
  FORM_BELIEF_CHANGE,
  FORM_EXPERIMENT_TO_TEST_BELIEF,
  FORM_THOUGHT_RECORD,
  FORM_WORRY_PRODUCTIVELY,
} from '@/app.constants';
import { CommonDialogsService } from '../shared/common-dialogs.service';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { StepsDataService } from '../shared/steps-data.service';
import { UserFeedbackComponent } from '../shared/user-feedback/user-feedback.component';
import { MatBottomSheet } from '@angular/material';
import { SlidesBottomsheetComponent } from './slides-bottomsheet/slides-bottomsheet.component';
import { BeliefChangeComponent } from '@/main/resources/forms/belief-change/belief-change.component';
import { EttbfBeliefComponent } from '@/main/resources/forms/experiment-to-test-belief-form/ettbf-belief/ettbf-belief.component';
import { ThoughtRecordFormComponent } from '@/main/resources/forms/thought-record-form/thought-record-form.component';
import { WorryProductivelyComponent } from '@/main/resources/forms/worry-productively-form/worry-productively.component';
import { FlowService } from '@/main/flow/flow.service';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';
import {CommonService} from '@/shared/common.service';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('hidden', style({ display: 'none' })),
      state('show', style({ display: 'block' })),
      transition('hidden => show', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition('show => hidden', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('formInOut', [
      state('hidden', style({ display: 'none' })),
      state('show', style({ display: 'block' })),
      transition('hidden => show', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition('show => hidden', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class SlidesComponent implements OnInit, AfterContentInit {
  @ViewChild(FormDirective, { static: false }) formHost!: FormDirective;
  @ViewChild('form_div', { static: false }) formDiv!: ElementRef;
  @ViewChild('slideDiv', { static: false }) slideDiv!: ElementRef;
  @ViewChild('slidePage', { static: false }) slidePage!: ElementRef;
  @ViewChild('container', { static: false }) container!: ElementRef;
  @ViewChild('loader', { static: false }) loader!: ElementRef;
  @ViewChild(UserFeedbackComponent, { static: false })
  userFeedback!: UserFeedbackComponent;
  scrollTop = 0;

  constructor(
    private slideService: SlideService,
    private sanitizer: DomSanitizer,
    private componentFactoryResolver: ComponentFactoryResolver,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private commonDialogService: CommonDialogsService,
    private flowStepService: FlowStepNavigationService,
    private stepDataService: StepsDataService,
    private _bottomSheet: MatBottomSheet,
    private flowService: FlowService,
    private goToService: NavbarGoToService,
    private commonService: CommonService,
  ) {}

  slide!: Slide;
  sanitizedUrl!: SafeUrl;
  status!: string;
  notAvailable = false;

  visible!: boolean;
  isFormVisible = false;
  isSlidesVisible = true;
  showFeedback = false;
  showNextStepBtn = false;
  slideLiked = false;
  slideDisliked = false;

  initial_feedback!: number;
  feedbackDataId!: number;

  feedbackData: SlidesFeedback = new SlidesFeedback(0, 0, 1);
  feedbackText: SlidesFeedbackText = new SlidesFeedbackText('');
  completionData: StepCompleteData = new StepCompleteData(0, 0);
  time_spent: any;
  current_step_id!: number;
  isLastStep = false;
  lastStepCompleted = false;
  next_step_id!: number;
  step_type: any;
  screenHeight: any;
  screenWidth: any;
  showVideo = false;
  iframeHeight!: number;
  slideDivHeight!: number;
  navbarTitle!: string;
  stepSequence!: number;
  stepName!: string;
  stepGroupSequence!: number;
  showloading = false;

  ngOnInit() {
    this.activateRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id => this.stepDataService.getStepData(parseInt(id, 10))),
      )
      .subscribe((slide_data: any) => {
        if (
          [COMPLETED, ACTIVE].includes(slide_data.data.status) &&
          slide_data.data.data_type === SLIDE
        ) {
          console.log('slide_data', slide_data);
          this.step_type = SLIDE;
          this.slide = <Slide>slide_data.data.step_data.data;
          this.current_step_id = slide_data.data.id;
          this.isLastStep = slide_data.data.is_last_step;
          this.next_step_id = slide_data.data.next_step_id;
          this.showNextStepBtn = false;
          if (slide_data.data.status === COMPLETED) {
            this.showNextStepBtn = true;
            if (this.isLastStep) {
              this.lastStepCompleted = true;
            }
          }
          // for navbar title
          this.stepGroupSequence = slide_data.data.step_group_sequence + 1;
          this.stepSequence = slide_data.data.sequence + 1;
          this.stepName = slide_data.data.name;
          this.navbarTitle =
            this.stepGroupSequence.toString() +
            '.' +
            this.stepSequence.toString() +
            ' ' +
            this.stepName;
          console.log('STEP DETAIL:', this.navbarTitle);
          this.flowService.stepDetail.emit(this.navbarTitle);
          this.initVideoData(slide_data);
          const slideId = slide_data.data.step_data.data.id;
          this.slideService
            .getFeedBackInfo(slideId)
            .subscribe((feedback_data: any) => {
              if (feedback_data.exists) {
                this.initial_feedback = feedback_data.feedback;
                if (this.initial_feedback === 1) {
                  this.slideLiked = true;
                } else if (this.initial_feedback === -1) {
                  this.slideDisliked = true;
                }
              } else {
                this.slideDisliked = false;
                this.slideLiked = false;
                this.initial_feedback = 0; // if it the first response
              }
            });
          if (this.slide) {
            this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.slide.url,
            );
          } else {
            this.notAvailable = true;
          }
          const formName = slide_data.data.action[0];
          if (formName === FORM_PROBLEM_SOLVING) {
            setTimeout(
              () => this.loadForm(ProblemSolvingWorksheetsComponent),
              1000,
            );
          } else if (formName === FORM_TASK) {
            setTimeout(() => this.loadForm(TaskFormsComponent), 1000);
          } else if (formName === FORM_BELIEF_CHANGE) {
            setTimeout(() => this.loadForm(BeliefChangeComponent), 1000);
          } else if (formName === FORM_EXPERIMENT_TO_TEST_BELIEF) {
            setTimeout(() => this.loadForm(EttbfBeliefComponent), 1000);
          } else if (formName === FORM_THOUGHT_RECORD) {
            setTimeout(() => this.loadForm(ThoughtRecordFormComponent), 1000);
          } else if (formName === FORM_WORRY_PRODUCTIVELY) {
            setTimeout(() => this.loadForm(WorryProductivelyComponent), 1000);
          }
          if (window.matchMedia('(max-width: 767px)').matches) {
            this.visible = true;
          } else {
            setTimeout(() => {
              this.slideDiv.nativeElement.classList.add('col-5'),
                console.log(
                  'iframe height',
                  window.screen.height,
                  this.slideDiv.nativeElement.offsetHeight,
                );
            }, 1000);
          }
        } else {
          this.notAvailable = true;
        }
      });
  }

  ngAfterViewChecked(): void {}

  onLoad() {
    this.showFeedback = true;
    this.loader.nativeElement.classList.remove('show-loader');
    this.loader.nativeElement.classList.add('hide-loader');
    this.slidePage.nativeElement.classList.remove('hide-loader');
    this.slidePage.nativeElement.classList.add('show-loader');
    this.iframeHeight = this.container.nativeElement.offsetHeight;
    console.log('IFRAME height', this.iframeHeight);
    if (this.screenWidth < 768) {
      this.slideDivHeight = this.iframeHeight + 68;
    } else {
      this.slideDivHeight = this.iframeHeight + 110;
    }
  }
  ngAfterContentInit(): void {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  initVideoData(slide_data: any) {
    if (slide_data.data.hook[0] === SHOW_MINDFULNESS_VIDEO) {
      setTimeout(() => this.openBottomSheet(), 2000);
      this.slideService.videoUrl_1 =
        slide_data.data.mindfulness_videos[0].resource_video.url;
      this.slideService.videoUrl_3 =
        slide_data.data.mindfulness_videos[1].resource_video.url;
      this.slideService.videoUrl_5 =
        slide_data.data.mindfulness_videos[2].resource_video.url;
    }
  }

  loadForm(component: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component,
    );
    const viewContainerRef = this.formHost.viewContainerRef;
    console.log('formhost', this.formHost.viewContainerRef);
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    // @ts-ignore
    componentRef.instance.fromSlide = true;
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.isFormVisible = false;
    } else {
      this.isFormVisible = true;
      this.formDiv.nativeElement.classList.add('col-4');
    }
  }
  onShowForm() {
    this.visible = !this.visible;
    this.isFormVisible = true;
    this.isSlidesVisible = false;
  }

  onShowSlides() {
    this.visible = !this.visible;
    this.isSlidesVisible = true;
    this.isFormVisible = false;
  }

  scrollPageToBottom() {
    this.scrollTop = this.slideDiv.nativeElement.scrollHeight;
    setTimeout(() => {
      this.slideDiv.nativeElement.scrollTop = this.scrollTop;
    }, 100);
  }

  storeSlideFeedBackData() {
    this.feedbackData.initial_feedback_state = this.initial_feedback;
    this.feedbackData.final_feedback_state = this.userFeedback.final_feedback;
    this.feedbackData.slide_id = this.slide.id;
    this.slideService.storeFeedBackInfo(this.feedbackData).subscribe(data => {
      this.feedbackDataId = data.data.id;
      this.initial_feedback = this.userFeedback.final_feedback;
    });
  }

  onCompleted() {
    this.time_spent = 100;
    this.showloading = true;
    this.completionData.time_spent = this.time_spent;
    this.completionData.step_id = this.current_step_id;
    this.stepDataService
      .storeCompletionData(this.completionData)
      .subscribe(data => {
        this.showNextStepBtn = true;
        this.showloading = false;
        this.commonService.postScore(50)
          .subscribe(() => {
            console.log('score');
          });
      });
  }
  onNextStepClick() {
    console.log('Next step clicked');
    this.goToService.clickFlow.emit();
  }
  onSubmitComment() {
    this.feedbackText.feedback_text = this.userFeedback.feedback_text;
    this.slideService
      .updateFeedBackInfo(this.feedbackText, this.feedbackDataId)
      .subscribe(data => {});
    this.scrollTop = 0;
  }

  openBottomSheet() {
    this._bottomSheet.open(SlidesBottomsheetComponent);
  }
}
