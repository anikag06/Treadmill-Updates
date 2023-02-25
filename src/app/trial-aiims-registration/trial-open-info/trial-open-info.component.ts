import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OPEN_REGISTRATION_PATH} from '@/app.constants';

@Component({
  selector: 'app-trial-open-info',
  templateUrl: './trial-open-info.component.html',
  styleUrls: ['./trial-open-info.component.scss']
})
export class TrialOpenInfoComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,) {
  }

  openPage!: boolean;
  faqPage = false;
  ppPage = false;
  tcPage = false;

  ngOnInit() {
    if (this.router.url.includes('open')) {
      this.openPage = true;
    }
    this.activatedRoute.queryParams.subscribe(data => {
      console.log(data);
      if (data.type === 'faq') {
        this.faqPage = true;
      } else if (data.type === 'pp') {
        this.ppPage = true;
      } else if (data.type === 'tc') {
        this.tcPage = true;
      }
    });
  }
  onLogoClick() {
    this.router.navigate([OPEN_REGISTRATION_PATH]);
  }

}
