import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FlowService } from '@/main/flow/flow.service';
import { map, switchMap } from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import {LoadFilesService} from '@/main/games/shared/load-files.service';
import {ControlContentService} from '@/main/resources/control-content/control-content.service';
import {FlowStepNavigationService} from '@/main/shared/flow-step-navigation.service';
import {PassDataService} from '@/main/resources/conversation-group/passdata.service';
import {StepCompleteData} from '@/main/resources/shared/completion-data.model';



@Component({
  selector: 'app-control-content',
  templateUrl: './control-content.component.html',
  styleUrls: ['./control-content.component.scss'],
  providers: [FlowService],
})
export class ControlContentComponent implements OnInit {
  @ViewChild('target', {static: false}) target!: ElementRef;
  // x = '<div class="row"><div class="col"><h2 >hi</h2></div></div>' ;
  displayHtml: string | undefined;
  displayHtmlHeader: string | undefined;
  next_step_id!: number;
  completionData: StepCompleteData = new StepCompleteData(0, 0);
  current_step_id!: number;
  isLastStep =  false;
  dataloaded: boolean;
  nextLoaded: boolean;



  constructor(
    private flowService: FlowService,
    private activateRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private loadFilesService: LoadFilesService,
    private controlContentService: ControlContentService,
    private flowStepService: FlowStepNavigationService,
    private router: Router,
    private passData: PassDataService

  ) {}
  nextBtnShow = false;



  ngOnInit() {
    this.loadFilesService.loadExternalStyles('/control-content-styles.css').then(() => {}).catch(() => {});

    this.activateRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id => this.stepDataService.getStepData(parseInt(id, 10))),
      )
      .subscribe((control_data: any) => {
        console.log('control data: ', control_data);
        this.displayHtml = control_data.data.step_data.data.html_content;
        this.displayHtmlHeader = control_data.data.step_data.data.title;
        this.next_step_id = control_data.data.next_step_id;
        this.current_step_id = control_data.data.id;
        this.isLastStep = control_data.data.is_last_step;

        this.dataloaded = true;
        this.nextLoaded = true;
       // this.nextLoaded = true;
        if (control_data.data.status === 'COMPLETED') {
          this.nextBtnShow = true;
        } else if (control_data.data.status === 'ACTIVE'){
          this.nextBtnShow = false;
        }

      });
  }


  onHtmlNext() {
    this.flowStepService.getNextStepData(this.next_step_id).subscribe(next_step => {
      console.log('next_step_detail is', next_step);
      console.log('next_step_data is', next_step.data);
      const next_step_url = this.flowStepService.goToFlowNextStep(next_step.data);
      console.log('url is', next_step_url);
      this.router.navigate([next_step_url]);
      this.onScrollToTop();
     // this.nextButton(next_step);
    });
    this.dataloaded = false;
    //this.nextLoaded = false;



  }

  onHtmlComplete() {
    this.completionData.step_id = this.current_step_id;
    this.completionData.time_spent = 100;

    this.stepDataService.storeCompletionData(this.completionData)
      .subscribe(() => {this.nextLoaded = true; });


    this.nextBtnShow = true;
    this.dataloaded = true;
    //this.onHtmlNext();
    //this.nextButton(this.current_step_id);
    this.nextLoaded = false;
  }



  onHtmlDashboard() {
    this.router.navigate(['/']);
  }

  onHtmlNextClick() {
    this.router.navigate([this.onHtmlNext()]);
  }
  // tslint:disable-next-line:use-life-cycle-interface

  onScrollToTop() {
    setTimeout(() => {
      this.target.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 10);



  }
  //nextButton(control_data){
    //if (control_data.data.status === 'COMPLETED') {
      //this.nextBtnShow = true;
    //}
  //}

}







