import { Component, OnInit } from '@angular/core';
import { ConclusionService } from '@/main/resources/conclusion/conclusion.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-evaluate-mood',
  templateUrl: './evaluate-mood.component.html',
  styleUrls: ['./evaluate-mood.component.scss'],
})
export class EvaluateMoodComponent implements OnInit {
  moodEvaluate!: boolean;
  conclusionServiceSub!: Subscription;
  constructor(
    private conclusionService: ConclusionService,
    private router: Router,
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.conclusionServiceSub = this.conclusionService.evaluateMood.subscribe(
      () => {
        this.moodEvaluate = this.conclusionService.moodEvaluate;
        console.log('mood evaluate', this.conclusionService.moodEvaluate);
      },
    );
  }
  onEvaluateMood() {
    // this.conclusionService.moodEvaluate = false;
    // this.moodEvaluate = this.conclusionService.moodEvaluate;
    return this.router.navigate(['/questionnaire/']);
  }

  ngOnDestroy() {
    this.conclusionServiceSub.unsubscribe();
  }
}
