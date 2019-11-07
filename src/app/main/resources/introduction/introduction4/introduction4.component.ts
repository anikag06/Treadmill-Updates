import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import { LOCKED } from '@/app.constants';

@Component({
  selector: 'app-introduction4',
  templateUrl: './introduction4.component.html',
  styleUrls: ['./introduction4.component.scss']
})
export class Introduction4Component implements OnInit {
  stepGroupSequence!: number;
  dataLoaded: boolean = false;
  locked: boolean = true;
  introductionDataSubscription!: Subscription;
  negativeBeliefs = ["I am incompetent", "I am unlovable", "I am worthless"];
  balancedBeliefs = ["balanced belief 1", "balanced belief 2", "balanced belief 3"];
  selectedBelief!: string;
  balancedBelief!: string;

  constructor(
    private introductionService: IntroductionService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe((data) => {
      this.stepGroupSequence = +data[0].path;
    });

    this.introductionDataSubscription = this.introductionService.getIntroductionData(this.stepGroupSequence).subscribe((data) => {
      if(data.user_step_status != LOCKED) {
        this.locked = false;
        this.selectedBelief = data.data.selectedBelief;
        this.onBeliefChanged();
      } else {
        this.locked = true;
      }
      this.dataLoaded = true;
    });
  }

  ngOnDestroy() {
    this.introductionDataSubscription.unsubscribe();
  }

  onBeliefChanged() {
    this.balancedBelief = this.balancedBeliefs[this.negativeBeliefs.indexOf(this.selectedBelief)];
  }

  saveData() {
    let data = {
      selectedBelief: this.selectedBelief,
    };
    this.introductionService.storeIntroductionData(this.stepGroupSequence, data).subscribe((data) => {
      console.log("success");
    });
  }

}
