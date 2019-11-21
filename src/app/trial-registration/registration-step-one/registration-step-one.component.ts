import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrialAuthService } from '../shared/trial-auth.service';

@Component({
  selector: 'app-registration-step-one',
  templateUrl: './registration-step-one.component.html',
  styleUrls: ['./registration-step-one.component.scss']
})
export class RegistrationStepOneComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: TrialAuthService,
  ) { }

  ngOnInit() {
  }

  emailSubmit() {
    console.log('on form submit');
    this.authService.activateChild(true);
    this.router.navigate(['step-2'], {relativeTo: this.route} );
  }
}
