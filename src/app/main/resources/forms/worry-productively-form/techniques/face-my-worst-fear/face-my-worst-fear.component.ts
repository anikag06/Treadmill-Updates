import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { WorryProductivelyService } from '../../worry-productively.service';
import { Worry } from '../../worry.model';

@Component({
  selector: 'app-face-my-worst-fear',
  templateUrl: './face-my-worst-fear.component.html',
  styleUrls: ['./face-my-worst-fear.component.scss'],
})
export class FaceMyWorstFearComponent implements OnInit {
  @Input() worry !: Worry;
  @ViewChild('panel2', { static: false }) panel2!: any;

  faceYourWorstFearForm = this.fb.group({
    faceYourWorstFear: new FormControl('', Validators.required),
    emergency_plan: new FormControl('', Validators.required),
  });
  continueButton = false;
  continueEmergency = false;
  faceYourFear: string[] = [];
  showTasks = false;
  responseData = '';
  taskHeading = "Decide a time when you will worry about it.";
  summaryText !: string;
  constructor(
    private fb: FormBuilder,
    private worryService: WorryProductivelyService,
  ) { }

  ngOnInit() { }
  ngOnChanges() {
    this.resetForm();
    if (this.worry) {
      this.worryService.getWorstFear(this.worry.id).subscribe(
        (resp: any) => {
          if (resp.body) {
            this.faceYourWorstFearForm.controls['faceYourWorstFear'].setValue(resp.body.worst_fear);
            console.log(this.faceYourWorstFearForm.controls['emergency_plan'].setValue(resp.body.emergency_plan));
            this.faceYourWorstFearForm.controls['emergency_plan'].setValue(resp.body.emergency_plan);
            this.faceYourFear.push(resp.body.worst_fear);
            this.summaryText = resp.body.worst_fear;
            this.continueButton = false;
            this.continueEmergency = false;
            if (resp.body.emergency_plan != '') {
              this.showTasks = true;
            }

          }
        }
      )
    }
  }

  onWorstFearClick() {
    this.continueButton = false;
    this.continueEmergency = false;
    this.showTasks = true;
    this.summaryText = this.faceYourWorstFearForm.controls['faceYourWorstFear'].value;
    if (this.responseData.length == 0 && this.faceYourFear.length == 0) {
      const object = {
        worry_id: this.worry.id,
        worst_fear: this.faceYourWorstFearForm.controls['faceYourWorstFear'].value,
        emergency_plan: this.faceYourWorstFearForm.controls['emergency_plan'].value,
      }
      this.worryService.postWorstFear(object).subscribe(
        (resp: any) => {
          if (resp.body) {
            console.log("The request has been submitted");
            this.responseData = resp.body;
          }
        })
    } else if (this.responseData.length != 0 || this.faceYourFear.length != 0) {
      const object = {
        worry_id: this.worry.id,
        worst_fear: this.faceYourWorstFearForm.controls['faceYourWorstFear'].value,
        emergency_plan: this.faceYourWorstFearForm.controls['emergency_plan'].value,
      }
      this.worryService.putWorstFear(object, this.worry.id).subscribe(
        (resp: any) => {
          if (resp.body) {
            console.log("The request has been submitted");
            this.responseData = resp.body;
          }
        })
    }
  }
  onEmergencyPlan() {
    this.summaryText = this.faceYourWorstFearForm.controls['faceYourWorstFear'].value;
    this.panel2.expanded = false;
    this.onWorstFearClick();
  }
  resetForm() {
    this.faceYourWorstFearForm = this.fb.group({
      faceYourWorstFear: new FormControl('', Validators.required),
      emergency_plan: new FormControl('', Validators.required),
    });
    this.showTasks = false;

  }
  onFocusfear() {
    this.continueButton = true;
  }
  onFocusEmergency() {
    this.continueEmergency = true;
  }
}
