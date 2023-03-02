import { ConclusionService } from '@/main/resources/conclusion/conclusion.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizService } from '@/shared/questionnaire-deprecated/questionnaire-deprecated.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluate-mood',
  templateUrl: './evaluate-mood.component.html',
  styleUrls: ['./evaluate-mood.component.scss'],
})
export class EvaluateMoodComponent implements OnInit {
  conclusionServiceSub!: Subscription;
  showQuestionnaire!: boolean;
  @Input() moodEvaluate!: boolean;
  @Input() fromConclusion!: boolean;

  constructor(
    private conclusionService: ConclusionService,
    private router: Router,
    private quizService: QuizService,
  ) {}

  ngOnInit() {
    this.quizService.questionnaire_active.subscribe((value: boolean) => {
      if (!value) {
        this.moodEvaluate = false;
        this.showQuestionnaire = false;
      }
    });
  }
  ngOnChanges() {}
  ngAfterViewInit() {}
  onEvaluateMood() {
    this.showQuestionnaire = true;
    this.quizService.questionnaire_active.emit(true);
  }

  ngOnDestroy() {
    // if (this.conclusionServiceSub) {
    //   this.conclusionServiceSub.unsubscribe();
    // }
  }
}
