import { Component, OnInit } from '@angular/core';
import {ConclusionService} from '@/main/resources/conclusion/conclusion.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-evaluate-mood',
  templateUrl: './evaluate-mood.component.html',
  styleUrls: ['./evaluate-mood.component.scss']
})
export class EvaluateMoodComponent implements OnInit {
  moodEvaluate!: boolean;
  constructor(private conclusionService: ConclusionService,
              private router: Router ) { }

  ngOnInit() {
    this.moodEvaluate = this.conclusionService.moodEvaluate;
    console.log('ME', this.conclusionService.moodEvaluate);

  }
  onEvaluateMood() {
    this.conclusionService.moodEvaluate = false;
    this.moodEvaluate = this.conclusionService.moodEvaluate;
    return this.router.navigate(['/questionnaire/']);
  }

}
