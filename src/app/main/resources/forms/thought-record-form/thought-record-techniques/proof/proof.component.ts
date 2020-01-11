import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-proof',
  templateUrl: './proof.component.html',
  styleUrls: ['./proof.component.scss'],
})
export class ProofComponent implements OnInit, AfterViewInit {
  favorTitle = 'What are the evidences supporting this negative thought?';
  againstTitle = 'What are the evidences against this negative thought?';
  // teamForm: FormGroup;
  // teamFormSub: Subscription;
  // players: FormArray;

  @ViewChild('autosize', { static: false }) autosize!: CdkTextareaAutosize;
  submitted = false;

  proofStatementGroup = this.fb.group({
    favourStatements: this.fb.array([]),
    againstStatements: this.fb.array([]),
  });

  ngAfterViewInit(): void {
    const panel = this.element.nativeElement.querySelectorAll(
      '.mat-expansion-panel-body',
    );
    panel[0].setAttribute('style', 'padding: 0px 0px 0px 16px');
  }

  constructor(private fb: FormBuilder, private element: ElementRef) {}

  ngOnInit() {
      // this.teamFormSub = this.teamFormService.teamForm$
      //   .subscribe(team => {
      //     this.teamForm = team;
      //     this.players = this.teamForm.get('players') as FormArray;
      //   })
  }

  onSubmit() {
    this.submitted = true;
  }

  getFavourUpdatedvalue($event: any) {
    console.log($event);
  }
  getAgainstpdatedvalue($event: any) {}
}
