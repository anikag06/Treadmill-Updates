import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

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
  summary!: string;
  @ViewChild('autosize', { static: false }) autosize!: CdkTextareaAutosize;
  submitted = false;
  @ViewChild('panel', { static: false }) panel!: any;
  proofStatementForm = this.fb.group({
    favorEvidences: this.fb.array([]),
    againstEvidences: this.fb.array([]),
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
  get favorEvidences(): FormArray {
    return this.proofStatementForm.get('favorEvidences') as FormArray;
  }
  get againstEvidences(): FormArray {
    return this.proofStatementForm.get('againstEvidences') as FormArray;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.proofStatementForm);
    const arrayControl = this.proofStatementForm.get(
      'favorEvidences',
    ) as FormArray;
    this.summary = arrayControl.at(0).value.evidence;

    this.panel.expanded = false;
  }

  // getFavourUpdatedvalue($event: any) {
  //   console.log($event);
  // }
  // getAgainstpdatedvalue($event: any) {}
}
