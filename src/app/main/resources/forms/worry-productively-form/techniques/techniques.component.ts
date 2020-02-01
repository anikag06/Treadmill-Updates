import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import {MatDialog} from '@angular/material';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  TECHNIQUE_UNTOUCHED,
  TECHNIQUE_OPENED,
  TECHNIQUE_CLOSED,
} from '@/app.constants';
import { EVALUATE_DATA } from './evaluate-worry/evaluate-info.data';
import { TechniquesInfoComponent } from '../../thought-record-form/thought-record-techniques/techniques-info/techniques-info.component';
import { TECHNIQUE_DATA } from './techniques-info.data';
import { Worry } from '../worry.model';
// import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
// import { TechniqueInfoComponent } from './technique-info/technique-info.component';
@Component({
  selector: 'app-techniques',
  templateUrl: './techniques.component.html',
  styleUrls: ['./techniques.component.scss'],
})
export class TechniquesComponent implements OnInit {
  @ViewChild('doneBtn', { static: false }) doneBtn!: ElementRef;
  @Input() worry !: Worry;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    // private dialogBoxService: DialogBoxService,
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

  ngOnInit() {}
  public ifevaluatedclicked = false;
  public beliefsClicked = false;
  public solveProbClicked = false;
  public dealWithWorry = false;
  evaluateSummary = false;
  beliefSummary = false;
  solveProbSummary = false;
  dealWorrySummary = false;
  panelOpenState1 = 0;
  panelOpenState2 = 0;
  panelOpenState3 = 0;
  panelOpenState4 = 0;
  panelOpenState5 = 0;

  EvaluateClick() {
    this.ifevaluatedclicked = true;
  }
  setEvaluateIcon(data: any) {
    this.evaluateSummary = data;
    if (this.evaluateSummary) {
      this.panelOpenState1 = 2;
    }
  }
  BeliefsClick() {
    this.beliefsClicked = true;
    console.log(this.beliefsClicked);
  }
  setBeliefIcon(data: any) {
    this.beliefSummary = data;
    if (this.beliefSummary) {
      this.panelOpenState3 = 2;
    }
  }
  solveProbClick() {
    this.solveProbClicked = true;
  }
  setProbIcon(data: any) {
    this.solveProbSummary = data;
    if (this.solveProbSummary) {
      this.panelOpenState4 = 2;
    }
  }
  DealwithWorryClick() {
    this.dealWithWorry = true;
  }
  setDealWorryIcon(data: any) {
    this.dealWorrySummary = data;
    if (this.dealWorrySummary) {
      this.panelOpenState5 = 2;
    }
  }
  TechniqueInfo() {
  //   console.log(this.doneBtn);
  //   const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
  //   this.doneBtn.nativeElement.dispatchEvent(domEvent);
  //   this.dialogBoxService.setDialogChild(TechniqueInfoComponent);
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
      })
  }
}