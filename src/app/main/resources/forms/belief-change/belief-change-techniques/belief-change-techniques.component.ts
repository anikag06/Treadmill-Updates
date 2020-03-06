import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TechniquesInfoComponent } from '@/main/resources/forms/shared/techniques-info/techniques-info.component';
import { BELIEF_CHANGE_TECHNIQUES_DATA } from '@/main/resources/forms/shared/techniques-info/techniques.data';
import { MatDialog } from '@angular/material';
import { Belief } from '@/main/resources/forms/belief-change/belief.model';
import { IFinalRatingServices } from '@/main/resources/forms/shared/form-final-rating/IFinalRatingServices';

@Component({
  selector: 'app-belief-change-techniques',
  templateUrl: './belief-change-techniques.component.html',
  styleUrls: ['./belief-change-techniques.component.scss'],
})
export class BeliefChangeTechniquesComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private element: ElementRef,
    @Inject('IFinalRatingServices')
    private providerService: IFinalRatingServices[],
  ) {}

  header =
    'Select a technique that you would like to use to modify your belief?';
  info = 'Use some of these techniques to modify beliefs.';
  @Input() belief!: Belief;
  @Output() showFinalBelief = new EventEmitter();
  // bg_color = '#FFFCE3';
  favorTitle = 'What are the evidence supporting this belief?';
  againstTitle = 'What are the evidence against this belief?';
  tellTechnique = 'What would I tell a friend?';
  tellQuestion =
    'What would I tell a close friend or relative if they were having this belief?';
  tellHdrColor = '#FFF3E9';
  showContinue = false;
  isCompleted = false;
  @Input() resetTechnique!: boolean;
  totalSummary: string[] = Array(3).fill('');
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.belief && this.resetTechnique) {
      this.reset();
      this.providerService[0]
        .getFinalRating(this.belief.id)
        .subscribe((data: any) => {
          if (data.final_rating) {
            this.onShowFinalBelief();
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

  onShowInfo() {
    const dialogRef = this.dialog.open(TechniquesInfoComponent, {
      panelClass: 'technique-info-dialog-container',
      autoFocus: false,
      data: {
        techniquesInfo: BELIEF_CHANGE_TECHNIQUES_DATA,
      },
    });
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

  onShowFinalBelief() {
    this.showContinue = false;
    this.showFinalBelief.emit();
    // this.showFinalThought.emit();
    // this.isCompleted = false;
  }

  triggerShowFinalBelief() {
    this.showContinue = true;
    // this.showContinue = true;
  }

  reset() {
    delete this.showContinue;
    delete this.isCompleted;
    this.totalSummary = Array(3).fill('');
  }
}
