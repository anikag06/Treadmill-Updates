import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { TRF_TECHNIQUES_DATA } from '../../shared/techniques-info/techniques.data';
import { TechniquesInfoComponent } from '../../shared/techniques-info/techniques-info.component';
import { Thought } from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import { IFinalRatingServices } from '@/main/resources/forms/shared/form-final-rating/IFinalRatingServices';

@Component({
  selector: 'app-thought-record-techniques',
  templateUrl: './thought-record-techniques.component.html',
  styleUrls: ['./thought-record-techniques.component.scss'],
})
export class ThoughtRecordTechniquesComponent implements OnInit, AfterViewInit {
  constructor(
    public dialog: MatDialog,
    public element: ElementRef,
    @Inject('IFinalRatingServices')
    private providerService: IFinalRatingServices[],
  ) {}

  @Input() thought!: Thought;
  @Input() resetTechnique!: boolean;
  @Output() showFinalThought = new EventEmitter();
  @Input() finalThought!: boolean;
  header =
    'Select the technique that you would like to use to evaluate the negative thought';
  info = 'Use some of these techniques to evaluate thoughts.';
  favorTitle = 'What are the evidence supporting this negative thought?';
  againstTitle = 'What are the evidence against this negative thought?';
  proofHdrColor = '#FFFCE3';
  explnHdrColor = '#FEC1C1';
  tellHdrColor = '#FFF3E9';
  explnTechnique = 'Is this the only explanation?';
  explnQuestion = 'Can there be another explanation for this situation?';
  tellTechnique = 'What would I tell a friend?';
  tellQuestion =
    'What would I tell a close friend or relative if they were having this thought?';
  info_heading = 'About Techniques';

  showContinue = false;
  isCompleted = false;
  totalSummary: string[] = Array(6).fill('');
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.thought && this.resetTechnique) {
      this.reset();
      this.providerService[1]
        .getFinalRating(this.thought.id)
        .subscribe((data: any) => {
          if (data.final_rating) {
            console.log(data);
            this.onShowFinalThought();
            this.isCompleted = true;
            this.showContinue = false;
          }
        });
    }
  }

  ngAfterViewInit() {
    const panel = this.element.nativeElement.querySelectorAll(
      '.mat-expansion-panel',
    );
    const panelBody = this.element.nativeElement.querySelectorAll(
      '.mat-expansion-panel-body',
    );
    for (let i = 0; i < panelBody.length; i++) {
      panel[i].setAttribute('style', 'box-shadow: 0px 1px 3px #00000024;');
    }
    for (let i = 0; i < panelBody.length; i++) {
      panelBody[i].setAttribute(
        'style',
        'padding-left:16px;padding-right:16px',
      );
    }
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

  // triggerShowFinalThought() {
  //   this.showContinue = true;
  //
  //   // this.isCompleted = true;
  //   // this.showFinalThought.emit();
  //   // this.showFinalThought.emit();
  //   // this.isCompleted = true;
  // }

  onShowFinalThought() {
    this.showContinue = false;
    this.showFinalThought.emit();
    // this.isCompleted = false;
  }

  onShowInfo() {
    const dialogRef = this.dialog.open(TechniquesInfoComponent, {
      panelClass: 'technique-info-dialog-container',
      autoFocus: false,
      data: {
        techniquesInfo: TRF_TECHNIQUES_DATA,
      },
    });
  }

  // showFinalRating() {
  //   return !this.showContinue && this.isCompleted;
  // }
  // setTotalSummary(summary: string, index: number) {
  //   this.totalSummary[index] = summary;
  // }
  reset() {
    delete this.showContinue;
    delete this.isCompleted;
    this.totalSummary = Array(6).fill('');
  }
}
