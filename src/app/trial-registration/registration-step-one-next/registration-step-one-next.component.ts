import { Component, OnInit } from '@angular/core';
import {RegistrationDataService} from '@/trial-registration/shared/registration-data.service';
import {ActivatedRoute} from '@angular/router';
import {
  AIIMS_GROUP,
  AIIMS_REGISTRATION_PATH,
  LEARN_GROUP, LEARN_GROUP_REGISTRATION_PATH,
  LIFE_GROUP, LIFE_GROUP_REGISTRATION_PATH,
  OPEN_GROUP,
  OPEN_REGISTRATION_PATH,
  STUDENT_GROUP, STUDENT_GROUP_REGISTRATION_PATH,
  WORK_GROUP, WORK_GROUP_REGISTRATION_PATH
} from '@/app.constants';

@Component({
  selector: 'app-registration-step-one-next',
  templateUrl: './registration-step-one-next.component.html',
  styleUrls: ['./registration-step-one-next.component.scss'],
})
export class RegistrationStepOneNextComponent implements OnInit {
  constructor(
    private registrationDataService: RegistrationDataService,
    private activateRoutes: ActivatedRoute,

  ) {}
  stepNo = null;
  link!: any;
  newLink!: string;
  newLinkFull!: string;
  dataLoaded = false;
  participant_category!: number;
  ngOnInit() {
    this.activateRoutes.queryParams.subscribe(data => {
      console.log('data', data);
      this.dataLoaded = true;
      if (data.link === '1') {
        this.link = AIIMS_REGISTRATION_PATH;
      } else if (data.link === '2') {
        this.link = OPEN_REGISTRATION_PATH;
      } else if (data.link === '3') {
        // this.link = STUDENT_GROUP;
        this.link = STUDENT_GROUP_REGISTRATION_PATH;
      } else if (data.link === '4') {
        // this.link = LIFE_GROUP;
        this.link = LIFE_GROUP_REGISTRATION_PATH;
      } else if (data.link === '5') {
        // this.link = LEARN_GROUP;
        this.link = LEARN_GROUP_REGISTRATION_PATH;
        console.log('data', this.link);
      } else if (data.link === '6') {
        // this.link = WORK_GROUP;
        this.link = WORK_GROUP_REGISTRATION_PATH;
      }
      // this.participant_category = this.registrationDataService.participant_category;
      console.log('data', this.link);
      this.newLink = this.link;
      this.newLinkFull = 'www.treadwill.org' + this.link;
    });
  }
}
