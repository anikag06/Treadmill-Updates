import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TechniquesInfoComponent } from '../../shared/techniques-info/techniques-info.component';
import { TECHNIQUE_DATA } from './techniques-info.data';
import { Worry } from '../worry.model';
import { WorryProductivelyService } from '@/main/resources/forms/worry-productively-form/worry-productively.service';
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
  @Output() onOriginalWorry = new EventEmitter();
  showContinue = false;
  isCompleted = false;
  totalSummary: string[] = Array(5).fill('');

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog,
    private worryService: WorryProductivelyService,
  ) {
    this.matIconRegistry.addSvgIcon(
      'Info',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../../assets/forms/Info.svg',
      ),
    );
    // edit icon is added in img tag
    // this.matIconRegistry.addSvgIcon(
    //   'EditErrors',
    //   this.domSanitizer.bypassSecurityTrustResourceUrl(
    //     '../../../../../../assets/forms/EditErrors.svg',
    //   ),
    // );
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

  ifDataSummary!: string;
  continueOriginalWorry = false;
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    this.reset();
    if (changes.worry && this.worry) {
      this.worryService.getFinalSlider(this.worry.id).subscribe((resp: any) => {
        console.log(resp);
        if (resp.ok) {
          this.isCompleted = true;
          this.showContinue = false;
        }
      });
    }
    // if (this.ifDataSummary) {
    //   this.continueOriginalWorry = true;
    // }
  }

  setDealSummary(data: any) {
    this.ifDataSummary = data;
    this.continueOriginalWorry = true;
    this.originalWorry.emit(this.continueOriginalWorry);
  }

  onTechniqueExpanded() {
    this.showContinue = false;
  }

  onTechniqueCollapsed(summaryObject: any) {
    this.totalSummary[summaryObject.index] = summaryObject.summary;
    for (let i = 0; i < this.totalSummary.length; i++) {
      if (this.totalSummary[i].length > 0) {
        this.showContinue = true;
        break;
      }
    }
  }

  showFinalRating() {
    this.showContinue = false;
    this.onOriginalWorry.emit();
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
  reset() {
    delete this.showContinue;
    delete this.isCompleted;
    this.totalSummary = Array(5).fill('');
  }
}
