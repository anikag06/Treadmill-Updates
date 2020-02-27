import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, SimpleChanges, ViewChild,} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {FormArray, FormBuilder} from '@angular/forms';

import {IProofEvidences} from '@/main/resources/forms/shared/proof-evidences/IProofEvidences';

@Component({
  selector: 'app-proof-evidences',
  templateUrl: './proof-evidences.component.html',
  styleUrls: ['./proof-evidences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProofEvidencesComponent implements OnInit {
  @Input() favorTitle!: string;
  @Input() againstTitle!: string;
  @Input() service!: number;
  @Input() reset!: boolean;
  @Output() techniqueExpanded = new EventEmitter();
  @Output() techniqueCollapsed = new EventEmitter();
  summary = '';
  forType = 'for';
  againstType = 'against';
  summaryHeading = 'Summary';
  @ViewChild('autosize', { static: false }) autosize!: CdkTextareaAutosize;

  @Input() id!: number;
  @ViewChild('panel', { static: false }) panel!: any;
  @Output() showFinal = new EventEmitter();
  techniqueName = 'What is the proof?';
  headerColor = '#FFFCE3';
  @Input() summaryIndex!: number;
  // forEvidences!: any;
  // againstEvidences!: any;

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

  constructor(
    private fb: FormBuilder,
    private element: ElementRef,

    private changeDetector: ChangeDetectorRef,
    @Inject('IProofEvidences')
    private providerService: IProofEvidences[],
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.id && this.reset) {
      // this.providerService[this.service]
      //   .getEvidences(this.id, this.againstType)
      //   .subscribe((object: any) => {
      //     if (object.evidences.length !== 0) {
      //       this.summary = object.evidences[0].evidence;
      //       this.showFinal.emit();
      //     }
      //     if (this.summary.length === 0) {
      //       this.providerService[this.service]
      //         .getEvidences(this.id, this.forType)
      //         .subscribe((resp: any) => {
      //           if (resp.evidences.length !== 0) {
      //             this.summary = resp.evidences[0].evidence;
      //             this.showFinal.emit();
      //           }
      //         });
      //     }
      //   });
    }
    if (this.reset) {
      this.resetForm();
    }
  }

  favorEvidences(): FormArray {
    return this.proofStatementForm.get('favorEvidences') as FormArray;
  }

  againstEvidences(): FormArray {
    return this.proofStatementForm.get('againstEvidences') as FormArray;
  }

  onSubmit() {
    const forEvidences = {
      evidences: this.proofStatementForm.controls[
        'favorEvidences'
      ].value.filter((str: any) => str.evidence.trim().length > 0),
    };

    const againstEvidences = {
      evidences: this.proofStatementForm.controls[
        'againstEvidences'
      ].value.filter((str: any) => str.evidence.trim().length > 0),
    };
    let againstSummary = false;
    let forSummary = false;
    if (againstEvidences.evidences.length > 0) {
      this.callPostEvidences(againstEvidences, this.againstType);
      againstSummary = true;
    }
    if (forEvidences.evidences.length > 0) {
      this.callPostEvidences(forEvidences, this.forType);
      if (!againstSummary) {
        forSummary = true;
      }
    }
    const summary = againstSummary
      ? againstEvidences.evidences[0].evidence
      : forSummary
      ? forEvidences.evidences[0].evidence
      : '';
    this.setSummary(summary);
    this.panel.close();
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

  setSummary(summary = '') {
    this.summary = summary;
    this.showFinal.emit();
    this.panelCollapse();
    // this.changeDetector.detectChanges();
  }

  resetForm() {
    this.proofStatementForm = this.fb.group({
      favorEvidences: this.fb.array([]),
      againstEvidences: this.fb.array([]),
    });
    delete this.summary;
  }
  panelCollapse() {
    const object = {
      index: this.summaryIndex,
      summary: this.summary ? this.summary : '',
    };
    this.techniqueCollapsed.emit(object);
  }
}
