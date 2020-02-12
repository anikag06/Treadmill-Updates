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

  
  continueOriginalWorry = false;
  ngOnInit() {}


  setDealSummary(data: any) {
    this.continueOriginalWorry = true;
    this.originalWorry.emit(this.continueOriginalWorry);
  }
 
  techniqueInfo() {
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
