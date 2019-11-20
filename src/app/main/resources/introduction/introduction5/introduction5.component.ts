import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import { LOCKED } from '@/app.constants';

@Component({
  selector: 'app-introduction5',
  templateUrl: './introduction5.component.html',
  styleUrls: ['./introduction5.component.scss']
})
export class Introduction5Component implements OnInit {
  stepGroupSequence!: number;
  dataLoaded: boolean = false;
  locked: boolean = true;
  introductionDataSubscription!: Subscription;
  worryThought = "";
  hours!: string;
  difficult!: string;
  selectedTechniques!: string[];
  help!: string;
  wastedHours = ["1 hours", "2 hours", "3 hours", "4 hours", "5 hours", "More than 5 hours", "More than 10 hours"];
  techniques = [
    "I tell myself not to worry",
    "I tell myself everything will be just fine",
    "I keep asking for reassurance from others",
    "I criticize myself for worrying and promise myself that I try to force myself to not worry",
    "I try to suppress the feeling of distress and anxiety associated to my worry",
  ];

  constructor(
    private introductionService: IntroductionService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe((data) => {
      this.stepGroupSequence = +data[0].path;
    });

    this.introductionDataSubscription = this.introductionService.getIntroductionData(this.stepGroupSequence).subscribe((data) => {
      if (data.user_step_status != LOCKED) {
        this.locked = false;
        this.worryThought = data.data.worryThought;
        this.hours = data.data.hours;
        this.difficult = data.data.difficult;
        this.selectedTechniques = data.data.selectedTechniques;
        this.help = data.data.help;
      } else {
        this.locked = true;
      }
      this.dataLoaded = true;
    });
  }

  ngOnDestroy() {
    this.introductionDataSubscription.unsubscribe();
  }

  saveData() {
    let data = {
      worryThought: this.worryThought,
      hours: this.hours,
      difficult: this.difficult,
      selectedTechniques: this.selectedTechniques,
      help: this.help
    };
    this.introductionService.storeIntroductionData(this.stepGroupSequence, data).subscribe((data) => {
      console.log("success");
    });
  }
}
