import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MoodTrackerComponent } from '@/main/shared/mood-tracker/mood-tracker.component';
import { MatDialog } from '@angular/material';
import { UserFeeling } from '@/main/resources/forms/thought-record-form/mood-widget-card/userfeeling.model';
import { ThoughtRecordService } from '@/main/resources/forms/thought-record-form/thought-record.service';
import { Thought } from '@/main/resources/forms/thought-record-form/thoughtRecord.model';

@Component({
  selector: 'app-mood-widget-card',
  templateUrl: './mood-widget-card.component.html',
  styleUrls: ['./mood-widget-card.component.scss'],
})
export class MoodWidgetCardComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public thoughtRecordService: ThoughtRecordService
  ) {}

  showMoodWidget = false;
  showSaveButton = false;
  moodSelected = false;
  submitted = false;
  @Output() onShowRecordBehave = new EventEmitter();
  @Input() header!: string;
  @Input() thought!: Thought;
  @Input() reset!: boolean;

  userFeelings: UserFeeling[] = [];
  rangeMargin: string[] = ['-20px', '17px', '60px', '98px', '125px'];
  circleMargin: string[] = ['15px', '17px', '11px', '10px', '17px'];
  emotions = ['Slightly', 'Somewhat', 'Quite', 'Very', 'Extremely'];
  showSpinner = false;
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.thought && this.reset) {
      // console.log(this.thought);
      this.thoughtRecordService
        .getFeelings(this.thought.id)
        .subscribe((resp) => {
          // console.log(resp);
          if (resp.body.data && resp.body.data.feelings.length > 0) {
            this.moodSelected = true;
            this.userFeelings = resp.body.data.feelings;
            // console.log(this.userFeelings);
            this.onShowRecordBehave.emit(true);
          }
        });
    }
    if (this.reset) {
      this.resetMoodForm();
    }
  }

  onShowMoodWidget() {
    this.showMoodWidget = !this.showMoodWidget;
    const dialogRef = this.dialog.open(MoodTrackerComponent, {
      panelClass: 'moodTracker-dialog-container',
      maxWidth: '100vw',
      autoFocus: false,
    });
    this.onDialogRefClosed(dialogRef);
  }

  onChangeMoodWidget() {
    this.showMoodWidget = !this.showMoodWidget;
    const dialogRef = this.dialog.open(MoodTrackerComponent, {
      panelClass: 'moodTracker-dialog-container',
      maxWidth: '100vw',
      autoFocus: false,
      data: {
        emotionsData: this.userFeelings,
      },
    });
    this.onDialogRefClosed(dialogRef);
  }

  onDialogRefClosed(dialogRef: any) {
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.data) {
        // this.userFeelings = [];
        // this.rating = [];
        // console.log(result.data);
        const emotions = result.data.emotions;
        const emotionsRating = result.data.emotionsRating;
        const filtered = this.userFeelings.filter(function (e: UserFeeling) {
          // @ts-ignore
          return this.indexOf(e.feeling) >= 0;
        }, emotions);
        this.userFeelings = filtered;

        console.log(this.userFeelings);

        emotions.forEach((feeling: string) => {
          let isFound = false;
          // @ts-ignore
          this.userFeelings.find((obj) => {
            if (obj.feeling === feeling) {
              obj.feeling_rating = emotionsRating[emotions.indexOf(feeling)];
              isFound = true;
            }
          });
          if (!isFound) {
            this.userFeelings.push(<UserFeeling>{
              feeling: feeling,
              feeling_rating: emotionsRating[emotions.indexOf(feeling)],
            });
          }
        });
        this.moodSelected = true;
        this.showSaveButton = true;
      }
    });
  }

  getMargin(rating: string) {
    return this.emotions.indexOf(rating);
  }

  onMoodSubmit() {
    this.submitted = true;
    const object = {
      feelings: this.userFeelings,
    };
    // console.log(this.userFeelings);
    this.showSpinner = true;
    this.thoughtRecordService
      .postFeelings(object, this.thought.id)
      .subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          this.onShowRecordBehave.emit(true);
          this.showSaveButton = false;
          this.showSpinner = true;
        }
      });
  }

  resetMoodForm() {
    this.userFeelings = [];
    this.moodSelected = false;
    this.onShowRecordBehave.emit(false);
  }
}
