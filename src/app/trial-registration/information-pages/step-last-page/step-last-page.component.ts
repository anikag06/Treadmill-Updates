import { Component, OnInit } from '@angular/core';
import { A2HSService } from '@/shared/a2hs.service';
import { FcmService } from '@/shared/fcm.service';
import {RegistrationDataService} from "@/trial-registration/shared/registration-data.service";

@Component({
  selector: 'app-step-last-page',
  templateUrl: './step-last-page.component.html',
  styleUrls: ['./step-last-page.component.scss'],
})
export class StepLastPageComponent implements OnInit {
  signup_link!: string;
  constructor( private registrationDataService: RegistrationDataService,) {}

  ngOnInit() {
    this.signup_link = this.registrationDataService.signup_link;
    console.log('sign up link', this.signup_link);
  }
}
