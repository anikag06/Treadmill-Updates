import { Component, OnInit } from '@angular/core';
import { TrialAuthService } from '../shared/trial-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-step-two',
  templateUrl: './registration-step-two.component.html',
  styleUrls: ['./registration-step-two.component.scss']
})
export class RegistrationStepTwoComponent implements OnInit {

  stepNo = 2;

  constructor(
    private authService: TrialAuthService,
    private router: Router,

  ) { }

  ngOnInit() {
  }
  genderSelected() {
    
  }

  stepDataSubmit() {
    this.authService.activateChild(true);
    this.router.navigate(['trial/trial-registration/step-3'] );
  }
}
