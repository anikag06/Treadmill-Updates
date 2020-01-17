import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
    ) {
    }

    showMoodWidget = false;
    showContinueButton = false;
    moodSelected = false;
    submitted = false;
    @Output() onShowRecordBehave = new EventEmitter();
    @Input() header!: string;
    @Input() showMood!: string;

    thought!: Thought;
    userFeelings: UserFeeling[] = [];
    rangeMargin: string[] = ['-20px', '17px', '60px', '98px', '125px'];
    circleMargin: string[] = ['15px', '17px', '11px', '10px', '17px'];
    emotions = ['Slightly', 'Somewhat', 'Quite', 'Very', 'Extremely'];
    rating: number[] = [];

    ngOnInit() {
        this.thoughtRecordService.getThought().subscribe((thought: any) => {
            this.thought = thought;
        });
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
            this.userFeelings = [];
            this.rating = [];
            if (result) {
                const feelingData = result.data.feelingData;
                const feelingRatingData = result.data.feelingRatingsData;
                console.log();
                for (let i = 0; i < feelingData.length; i++) {
                    this.rating.push(
                        this.emotions.indexOf(result.data.feelingRatingsData[i]),
                    );
                    this.userFeelings.push(<UserFeeling>{
                        feeling: result.data.feelingData[i],
                        feeling_rating: result.data.feelingRatingsData[i],
                    });
                }

                this.moodSelected = true;
                this.showContinueButton = true;
            }
        });
    }

    onMoodSubmit() {
        this.submitted = true;
        const object = {
            feelings: this.userFeelings,
        };
        this.thoughtRecordService
            .postFeelings(object, this.thought.id)
            .subscribe((resp: any) => {
                const status = resp.ok;
                if (status) {
                    this.onShowRecordBehave.emit(true);
                }
            });
    }

    // onChangeMood() {
    //   const dialogRef = this.dialog.open(MoodTrackerComponent, {
    //     panelClass: 'moodTracker-dialog-container',
    //     maxWidth: '100vw',
    //     autoFocus: false,
    //   });
    //   this.onDialogRefClosed(dialogRef);
    // }
}
