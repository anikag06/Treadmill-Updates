import { Component, OnInit } from '@angular/core';
import { ConclusionService } from '@/main/resources/conclusion/conclusion.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {QuizService} from '@/shared/questionnaire/questionnaire.service';

@Component({
  selector: 'app-evaluate-mood',
  templateUrl: './evaluate-mood.component.html',
  styleUrls: ['./evaluate-mood.component.scss'],
})
export class EvaluateMoodComponent implements OnInit {
  moodEvaluate = false;
  conclusionServiceSub!: Subscription;
  showQuestionnaire!: boolean;
  constructor(
    private conclusionService: ConclusionService,
    private router: Router,
    private quizService: QuizService,

  ) {}

  ngOnInit() {
    this.quizService.questionnaire_active.subscribe( (value: boolean) => {
      if (!value) {
        this.moodEvaluate = false;
        this.showQuestionnaire = false;
      }
    });
  }
  ngAfterViewInit() {
    this.conclusionServiceSub = this.conclusionService.evaluateMood.subscribe(
      () => {
        this.moodEvaluate = this.conclusionService.moodEvaluate;
        console.log('mood evaluate', this.conclusionService.moodEvaluate);
      },
    );
  }
  onEvaluateMood() {
   this.showQuestionnaire = true;
   this.quizService.questionnaire_active.emit(true);
  }

  ngOnDestroy() {
    this.conclusionServiceSub.unsubscribe();
  }
}
