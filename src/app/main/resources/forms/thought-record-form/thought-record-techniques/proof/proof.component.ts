import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild,} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import {ProofService} from '@/main/resources/forms/thought-record-form/thought-record-techniques/proof/proof.service';

@Component({
    selector: 'app-proof',
    templateUrl: './proof.component.html',
    styleUrls: ['./proof.component.scss'],
})
export class ProofComponent implements OnInit, AfterViewInit {
    favorTitle = 'What are the evidences supporting this negative thought?';
    againstTitle = 'What are the evidences against this negative thought?';
    summary = '';
  forType = 'for';
  againstType = 'against';
  @ViewChild('autosize', { static: false }) autosize!: CdkTextareaAutosize;
  submitted = false;
  @Input() thought!: Thought;
  @ViewChild('panel', { static: false }) panel!: any;

  proofStatementForm = this.fb.group({
    favorEvidences: this.fb.array([], [Validators.required]),
    againstEvidences: this.fb.array([], [Validators.required]),
  });

  ngAfterViewInit(): void {
    const panel = this.element.nativeElement.querySelectorAll(
      '.mat-expansion-panel-body',
    );
    panel[0].setAttribute('style', 'padding: 0px 0px 0px 16px');
  }

  constructor(
    private fb: FormBuilder,
    private element: ElementRef,
    private proofService: ProofService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.thought) {
      this.proofService
        .getEvidences(this.thought.id, this.againstType)
        .subscribe((resp: any) => {
          if (resp.body.data.evidences.length !== 0) {
            this.summary = resp.body.data.evidences[0].evidence;
          }
        });
        if (this.summary.length === 0) {
            this.proofService
                .getEvidences(this.thought.id, this.forType)
                .subscribe((resp: any) => {
                    if (resp.body.data.evidences.length !== 0) {
                        this.summary = resp.body.data.evidences[0].evidence;
                    }
                });
        }
    }
  }

  get favorEvidences(): FormArray {
    return this.proofStatementForm.get('favorEvidences') as FormArray;
  }

  get againstEvidences(): FormArray {
    return this.proofStatementForm.get('againstEvidences') as FormArray;
  }

  onSubmit() {
    this.submitted = true;

    const forEvidences = {
      evidences: this.proofStatementForm.controls['favorEvidences'].value,
    };

    const agaisntEvidences = {
      evidences: this.proofStatementForm.controls['againstEvidences'].value,
    };

    this.callPostEvidences(forEvidences, this.forType);
    this.callPostEvidences(agaisntEvidences, this.againstType);

    this.setSummary();
    this.panel.expanded = false;
  }

  callPostEvidences(evidences: any, type: string) {
    this.proofService
      .postEvidences(evidences, this.thought.id, type)
      .subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          console.log('post done');
        }
      });
  }

  setSummary() {
      if (this.proofStatementForm.controls['againstEvidences'].value[0]) {
          this.summary = this.proofStatementForm.controls[
              'againstEvidences'
              ].value[0].evidence;
      } else if (this.proofStatementForm.controls['favorEvidences'].value[0]) {
          this.summary = this.proofStatementForm.controls[
              'favorEvidences'
              ].value[0].evidence;
      }
    this.changeDetector.detectChanges();
  }
}
