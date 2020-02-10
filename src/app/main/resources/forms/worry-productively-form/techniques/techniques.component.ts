import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { EVALUATE_DATA } from './evaluate-worry/evaluate-info.data';
import { TechniquesInfoComponent } from '../../shared/techniques-info/techniques-info.component';
import { TECHNIQUE_DATA } from './techniques-info.data';
import { Worry } from '../worry.model';
@Component({
  selector: 'app-techniques',
  templateUrl: './techniques.component.html',
  styleUrls: ['./techniques.component.scss'],
})
export class TechniquesComponent implements OnInit {
  @ViewChild('doneBtn', { static: false }) doneBtn!: ElementRef;
  // @ViewChild('panel1', { static: false }) panel1!: any;
  @ViewChild('panel2', { static: false }) panel2!: any;
  // @ViewChild('panel3', { static: false }) panel3!: any;
  // @ViewChild('panel4', { static: false }) panel4!: any;
  // @ViewChild('panel5', { static: false }) panel5!: any;

  @Input() worry!: Worry;
  @Input() techniquesCall = false;
  @Output() originalWorry = new EventEmitter<boolean>();
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog,
  ) {
    this.matIconRegistry.addSvgIcon(
      'Info',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../../assets/forms/Info.svg',
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'EditErrors',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../../assets/forms/EditErrors.svg',
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'Close',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../../assets/forms/Close.svg',
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'QuestionMark',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../../assets/forms/QuestionMark.svg',
      ),
    );
  }

  evaluateSummary !: string;
  fearSummary !: string;
  beliefSummary !: string;
  solveProbSummary !: string ;
  dealWorrySummary !: string;
  continueOriginalWorry = false;
  ngOnInit() {}

  // setEvaluateSummary(data : any){
  //   this.evaluateSummary = data;
  //   this.panel1.expanded = false;
  // }
  // setBeliefSummary(data: any) {
  //   this.beliefSummary = data;
  //   this.panel3.expanded = false;

  // }
  // setProbSummary(data: any) {
  //   this.solveProbSummary = data;
  //   this.panel4.expanded = false;
  // }
  setDealSummary(data: any) {
    // this.dealWorrySummary = data;
    // this.panel5.expanded = false;
    this.continueOriginalWorry = true;
    this.originalWorry.emit(this.continueOriginalWorry);
  }
  resetTechniques(){
    this.evaluateSummary = '';
    this.beliefSummary ='';
    this.solveProbSummary ='';
    this.dealWorrySummary='';
  }

  techniqueInfo() {
    // console.log(this.doneBtn);
    // const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    // this.doneBtn.nativeElement.dispatchEvent(domEvent);
    const dialogRef = this.dialog.open(TechniquesInfoComponent, {
      panelClass: 'technique-info-dialog-container',
      autoFocus: false,
      data: {
        techniquesInfo: TECHNIQUE_DATA,
      },
    });
  }
  onShowInfo() {
    const dialogRef = this.dialog.open(TechniquesInfoComponent, {
      panelClass: 'technique-info-dialog-container',
      autoFocus: false,
      data: {
        techniquesInfo: EVALUATE_DATA,
      },
    });
  }
}
