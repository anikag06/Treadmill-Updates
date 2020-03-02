import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

import { Outcome } from '@/main/resources/forms/experiment-to-test-belief-form/ettbf-outcome/outcome.model';
import { ExperimentToTestBeliefService } from '@/main/resources/forms/experiment-to-test-belief-form/experiment-to-test-belief.service';
import { Belief } from '@/main/resources/forms/experiment-to-test-belief-form/ettbf-belief/belief.model';
import { FormSliderComponent } from '@/main/resources/forms/shared/form-slider/form-slider.component';
import {
  ETTBF_MAX_RATING_TEXT,
  ETTBF_MIN_RATING_TEXT,
  ETTBF_RATING_QUESTION,
} from '@/app.constants';
import { UserTask } from '../../shared/tasks/user-task.model';
import * as moment from 'moment';

@Component({
  selector: 'app-ettbf-outcome',
  templateUrl: './ettbf-outcome.component.html',
  styleUrls: ['./ettbf-outcome.component.scss'],
})
export class EttbfOutcomeComponent implements OnInit {
  @Input() outcome!: Outcome;
  @Input() belief!: Belief;
  @Input() task !: UserTask;
  @Input() getNotification !: boolean;
  @Output() finalSliderRating = new EventEmitter();
  @ViewChild('outcomeTextArea', { static: false }) outcomeTextArea!: ElementRef;
  @ViewChild('learningTextArea', { static: false })
  learningTextArea!: ElementRef;
  @ViewChild('realisticBeliefTextArea', { static: false })
  realisticBeliefTextArea!: ElementRef;
  outcomeStatement = '';
  learningStatement = '';
  realisticBeliefStatement = '';
  @ViewChild(FormSliderComponent, { static: false })
  finalSlider!: FormSliderComponent;
  ratingQuestion = ETTBF_RATING_QUESTION;
  minRatingText = ETTBF_MIN_RATING_TEXT;
  maxRatingText = ETTBF_MAX_RATING_TEXT;
  bothRatingsExist = false;
  beliefDecreased!: boolean;
  outcomeText = false;
  learningText = false;
  showLearning = false;
  showSlider = false;
  showSliderContinue = false;
  realisticContinue = false;
  outcomeResponse !: undefined;
  outcome_belief_id !: number;
  disableEmergency!: boolean;
  emergencyPlan !: boolean;
  value = 1;
  constructor(private ettbfBeliefService: ExperimentToTestBeliefService) {}

  ngOnInit(){
    
    if (this.task) {
      this.getEndDate();
      this.onDisableEmergency();
      this.taskLoaded;
    }
    // if( this.belief.taskorigin){
    //   this.ettbfBeliefService.getTasks(this.belief.taskorigin.task_id).subscribe(
    //     (resp : any)=>{
    //       this.task = resp.body.data;
    //       this.taskLoaded(this.task);          
    //     }
    //   );
    // }
  }
  ngOnChanges(changes: SimpleChanges){
    this.resetForm();
    if(this.belief){
      this.outcome_belief_id = this.belief.id;
    }
    console.log(this.outcome);
    if(this.outcome){
      this.outcomeStatement = this.outcome.outcome;
      if(this.outcome.learning !==''){
        this.learningStatement = this.outcome.learning;
        this.showLearning = true;
        this.emergencyPlan = true;
      }
      if(this.outcome.belief_rating_after !== null){
        this.value = this.outcome.belief_rating_after;
        this.showSlider = true;
      }
      if(this.outcome.realistic_belief !==''){
        this.realisticBeliefStatement = this.outcome.realistic_belief;
        this.beliefDecreased = true;
      }
    }
    if (changes.task) {
      this.getEndDate();
      this.onDisableEmergency();
      this.taskLoaded;
    }
    if(this.getNotification){
      if (this.outcomeStatement === ''){
        this.emergencyPlan = false;
      }
      else {
        this.emergencyPlan = true;
      }
    }
  }

  editOutcomeText() {
    this.outcomeTextArea.nativeElement.focus();
  }
  resetForm(){
    this.outcomeStatement ='';
    this.learningStatement = '';
    this.value = 1;
    this.realisticBeliefStatement='';
    this.showLearning = false;
    this.showSlider = false;
    this.bothRatingsExist = false;
  }
  onOutcomeSubmit() {
    if (this.outcome && Object.entries(this.outcome).length > 0) {

      this.outcome.belief_id = this.outcome_belief_id;
      this.outcome.outcome = this.outcomeStatement;
      this.outcome.learning = this.learningStatement;
      this.outcome.belief_rating_after = this.finalSlider.rating;
      this.outcome.realistic_belief = this.realisticBeliefStatement;
      this.ettbfBeliefService
        .putOutcome({
          id: this.outcome.id,
          belief_id: this.outcome.belief_id,
          outcome: this.outcome.outcome,
          learning: this.outcome.learning,
          belief_rating_after: this.outcome.belief_rating_after,
          realistic_belief: this.outcome.realistic_belief,
        })
        .subscribe(
          (data: any) => {
            this.outcome = data;
            this.outcomeResponse = data.body;
            console.log('The put request has been submitted');
          },
          error => {
            console.error(error);
          },
        );
    } else {
      if (this.outcomeStatement.trim().length > 0 && this.outcomeResponse == undefined) {
        this.ettbfBeliefService
          .postOutcome(this.belief.id, this.outcomeStatement)
          .subscribe(
            (data: any) => {
              this.outcome = data;
              this.outcomeResponse = data.outcome;
              console.log('The post request has been submitted');
            },
            error => {
              console.error(error);
            },
          );
      }
    }
    this.outcomeText = false;
    this.showLearning = true;
  }
 
  onLearningSubmit() {
    this.onOutcomeSubmit();
    this.learningText = false;
    this.showSlider = true;
  }

  onBeliefRatingAfterSubmit() {
    if (this.outcome) {
      this.outcome.belief_rating_after = this.finalSlider.rating;
      this.bothRatingsExist = true;
      this.compareRating();
      this.onOutcomeSubmit();
      if(!this.beliefDecreased){
        this.finalSliderRating.emit(this.outcome.belief_rating_after);
      }
    }
    this.showSliderContinue = false;
  }
  showSliderCont(){
    this.showSliderContinue = true;
  }
  onRealisticBeliefSubmit() {
    this.onOutcomeSubmit();
    this.finalSliderRating.emit(this.outcome.belief_rating_after);
    this.realisticContinue = false;
  }
  
  compareRating() {
    if (this.outcome.belief_rating_after && this.belief.belief_rating_before) {
      this.beliefDecreased =
      this.outcome.belief_rating_after < this.belief.belief_rating_before;
      if(this.beliefDecreased){
        this.finalSliderRating.emit(false);
      }
    }
  }
  getEndDate() {
    if(this.task){
      return moment(this.task.end_at).format('DD-MMM');
    }
  }
  onDisableEmergency() {
    const date = this.task.end_at + ' ' + this.task.time;
    this.disableEmergency =
      moment().format('YYYY-MM-DD HH:mm') <
      moment
        .utc(date)
        .local()
        .format('YYYY-MM-DD HH:mm');
  }
  taskLoaded(data : any){
    this.task = data;
    if(this.task){
      this.getEndDate();
      this.onDisableEmergency();
    }
    if(data){
      if (this.outcomeStatement === ''){
        this.emergencyPlan = false;
      }
      else {
        this.emergencyPlan = true;
      }
    }
  }
  onFocusOutcome(){
    this.outcomeText = true;
  }
  onFocusLearning(){
    this.learningText = true;
  }
  onFocusRealistic(){
    this.realisticContinue = true;
  }
}
