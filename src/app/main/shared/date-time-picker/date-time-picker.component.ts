import { WEEK } from '@/app.constants';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnChanges,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { Day } from './day.model';
import { DateTimePickerService } from './date-time-picker.service';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimePickerComponent
  implements OnInit, AfterViewInit, OnChanges {
  @Output() onClose = new EventEmitter();
  public min = new Date();
  public startDate!: Date;
  public endDate: Date = new Date();
  public startAt: Date = new Date();
  @Output() dateTimeMessage = new EventEmitter();
  @Output() taskFormDateTime = new EventEmitter();
  public startEndDate: Date[] = [];
  public showDays = false;
  public formDataDays: string[] = [];
  public daysCircle: Day[] = [];
  @Output() dateTimeSubmit = new EventEmitter<any>();
  public formDateTime: any[] = [];

  constructor(
    private element: ElementRef,
    @Optional() public dialogRef: MatDialogRef<DateTimePickerComponent>,
    private dateTimePickerService: DateTimePickerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    WEEK.forEach(day => {
      let newDay = new Day(day, true);
      this.daysCircle.push(newDay);
    });

    if (data) {
      let utcDate = data.end_date + ' ' + data.time;
      let gmtDateTime = moment.utc(utcDate, 'hh:mm');
      let localTime = gmtDateTime.local().format('hh:mm A');

      this.startEndDate.push(new Date(data.startDate + ' ' + localTime));
      this.startEndDate.push(new Date(data.endDate + ' ' + localTime));

      if (data.days) {
        let indexArray: number[] = [];
        data.days.forEach((day: string) => {
          if (WEEK.indexOf(day) > -1) {
            indexArray.push(WEEK.indexOf(day));
          }
        });
        this.daysCircle.forEach((dayCircle: Day, index) => {
          if (indexArray.indexOf(index) < 0) {
            this.daysCircle[index].selected = false;
          }
        });
      }
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
    let dateTimepicker = this.element.nativeElement.querySelectorAll(
      '.owl-dt-inline-container',
    );
    let removeFromToDate = this.element.nativeElement.querySelectorAll(
      '.owl-dt-container-info',
    );
    dateTimepicker[0].setAttribute('style', 'box-shadow:none');
    removeFromToDate[0].setAttribute('style', 'display:none');
  }

  ngOnChanges() {}

  onShowDays() {
    this.showDays = !this.showDays;
  }
  onDaySelected(index: number) {
    this.daysCircle[index].selected = !this.daysCircle[index].selected;
  }

  closeModal() {
    this.onClose.emit();
    this.dialogRef.close({ event: 'close' });
  }

  dateTimeMessageSubmit() {
    this.formDateTime.push(this.startEndDate[0], this.startEndDate[1]);

    let utcTime = this.dateTimePickerService.getUTCTime(this.startEndDate[0]);

    this.formDateTime.push(utcTime);

    this.formDateTime.push(this.formDataDays);

    let date = this.dateTimePickerService.getDateRange(
      this.startEndDate[0],
      this.startEndDate[1],
    );
    let hourMinute = this.dateTimePickerService.getTimeAmPm(
      this.startEndDate[0],
    );

    let repeat = this.getRepeatedDays(this.daysCircle);
    let chatDateTimeMessage = date + '<br/>' + hourMinute + '<br/>' + repeat;
    this.closeModal();
    this.dateTimeMessage.emit(chatDateTimeMessage);
    this.dateTimeSubmit.emit();
    let fromDateTimeData = {
      dateTime: this.formDateTime,
      showDateTimePicker: false,
    };
    console.log(this.startEndDate);

    console.log(this.formDateTime);

    this.dialogRef.close({ event: 'close', data: fromDateTimeData });
  }

  getRepeatedDays(days: Day[]): string {
    let repeatedDays: string[] = [];
    for (let i = 0; i < days.length; i++) {
      if (days[i].selected) {
        repeatedDays.push(WEEK[i]);
        this.formDataDays.push(WEEK[i]);
      }
    }
    let repeat = 'Repeat:';
    repeat += repeatedDays.join(',');
    return repeat;
  }
}
