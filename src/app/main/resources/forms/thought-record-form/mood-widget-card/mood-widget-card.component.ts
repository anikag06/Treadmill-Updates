import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges,} from '@angular/core';
import {MoodTrackerComponent} from '@/main/shared/mood-tracker/mood-tracker.component';
import {MatDialog} from '@angular/material';
import {UserFeeling} from '@/main/resources/forms/thought-record-form/mood-widget-card/userfeeling.model';
import {ThoughtRecordService} from '@/main/resources/forms/thought-record-form/thought-record.service';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';

@Component({
  selector: 'app-mood-widget-card',
  templateUrl: './mood-widget-card.component.html',
  styleUrls: ['./mood-widget-card.component.scss'],
})
export class MoodWidgetCardComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public thoughtRecordService: ThoughtRecordService,
  ) {}

  showMoodWidget = false;
  showContinueButton = false;
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

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.thought) {
      this.thoughtRecordService.getFeelings(this.thought.id).subscribe(resp => {
        if (resp.body.data && resp.body.data.feelings.length > 1) {
          this.moodSelected = true;
          this.userFeelings = resp.body.data.feelings;
          this.onShowRecordBehave.emit(true);
        }
      });
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

  onDialogRefClosed(dialogRef: any) {
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.data) {
        // this.userFeelings = [];
        // this.rating = [];
        const feelingData = result.data.feelingData;
        const feelingRatingData = result.data.feelingRatingsData;
        // if (this.userFeelings.length > 0) {
        feelingData.forEach((feeling: string) => {
          let isFound = false;
          // @ts-ignore
          this.userFeelings.find(obj => {
            if (obj.feeling === feeling) {
              obj.feeling_rating =
                feelingRatingData[feelingData.indexOf(feeling)];
              isFound = true;
            }
          });
          if (!isFound) {
            // this.rating.push(this.emotions.indexOf(feeling));
            this.userFeelings.push(<UserFeeling>{
              feeling: feeling,
              feeling_rating: feelingRatingData[feelingData.indexOf(feeling)],
            });
          }
          // console.log(this.rating);
        });
        this.moodSelected = true;
        this.showContinueButton = true;
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
    console.log(this.userFeelings);
    this.thoughtRecordService
      .postFeelings(object, this.thought.id)
      .subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          this.onShowRecordBehave.emit(true);
        }
      });
  }


}
