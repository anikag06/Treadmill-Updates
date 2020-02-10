import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild,} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {FormArray, FormBuilder, Validators} from '@angular/forms';

import {IProofEvidences} from '@/main/resources/forms/shared/proof-evidences/IProofEvidences';

@Component({
  selector: 'app-proof-evidences',
  templateUrl: './proof-evidences.component.html',
  styleUrls: ['./proof-evidences.component.scss'],
})
export class ProofEvidencesComponent implements OnInit {
  @Input() favorTitle!: string;
  @Input() againstTitle!: string;
  @Input() service!: number;
  summary = '';
  forType = 'for';
  againstType = 'against';
  @ViewChild('autosize', { static: false }) autosize!: CdkTextareaAutosize;
  submitted = false;
  @Input() id!: number;
  @ViewChild('panel', { static: false }) panel!: any;
  @Output() showFinal = new EventEmitter();
  techniqueName = 'What is the proof?';
  headerColor = '#FFFCE3';

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

    private changeDetector: ChangeDetectorRef,
    @Inject('IProofEvidences')
    private providerService: IProofEvidences[],
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.id) {
      this.resetForm();
      this.providerService[this.service]
        .getEvidences(this.id, this.againstType)
        .subscribe((object: any) => {
          if (object.evidences.length !== 0) {
            this.summary = object.evidences[0].evidence;
            this.showFinal.emit();
            if (this.summary.length === 0) {
              this.providerService[this.service]
                .getEvidences(this.id, this.forType)
                .subscribe((resp: any) => {
                  if (resp.evidences.length !== 0) {
                    this.summary = object.evidences[0].evidence;
                    this.showFinal.emit();
                  }
                });
            }
          }
        });
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
    this.providerService[this.service]
      .postEvidences(this.id, type, evidences)
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
      this.showFinal.emit();
    } else if (this.proofStatementForm.controls['favorEvidences'].value[0]) {
      this.summary = this.proofStatementForm.controls[
        'favorEvidences'
      ].value[0].evidence;
      this.showFinal.emit();
    }
    this.changeDetector.detectChanges();
  }

  resetForm() {
    this.proofStatementForm = this.fb.group({
      favorEvidences: this.fb.array([], [Validators.required]),
      againstEvidences: this.fb.array([], [Validators.required]),
    });
    delete this.summary;
  }
}
