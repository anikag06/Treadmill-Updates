import { WEEK } from '@/app.constants';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnChanges,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';
import { Day } from './day.model';
import { DateTimePickerService } from './date-time-picker.service';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
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
  START_DATE = 0;
  END_DATE = 1;

  constructor(
    private element: ElementRef,
    @Optional() public dialogRef: MatDialogRef<DateTimePickerComponent>,
    private dateTimePickerService: DateTimePickerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    WEEK.forEach(day => {
      const newDay = new Day(day, true);
      this.daysCircle.push(newDay);
    });

    if (data) {
      const utcDate = data.end_date + ' ' + data.time;
      const gmtDateTime = moment.utc(utcDate, 'hh:mm');
      const localTime = gmtDateTime.local().format('hh:mm A');

      this.startEndDate.push(new Date(data.startDate + ' ' + localTime));
      this.startEndDate.push(new Date(data.endDate + ' ' + localTime));

      if (data.days) {
        const indexArray: number[] = [];
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
    const dateTimepicker = this.element.nativeElement.querySelectorAll(
      '.owl-dt-inline-container',
    );
    const removeFromToDate = this.element.nativeElement.querySelectorAll(
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
    if (this.dialogRef) {
      this.dialogRef.close({ event: 'close' });
    }
  }

  dateTimeMessageSubmit() {
    this.formDateTime.push(
      this.startEndDate[this.START_DATE],
      this.startEndDate[this.END_DATE],
    );
    let utcTime;
    if (
      this.data &&
      this.data.startDate ===
        this.dateToString(this.startEndDate[this.START_DATE]) &&
      this.data.endDate ===
        this.dateToString(this.startEndDate[this.END_DATE]) &&
      this.timeToString(this.startEndDate[this.START_DATE]) !== this.data.time
    ) {
      utcTime = this.dateTimePickerService.getUTCTime(
        this.startEndDate[this.START_DATE],
      );
    } else {
      utcTime = this.dateTimePickerService.getUTCTime(
        this.startEndDate[this.END_DATE],
      );
    }

    this.formDateTime.push(utcTime);

    this.formDateTime.push(this.formDataDays);

    const date = this.dateTimePickerService.getDateRange(
      this.startEndDate[this.START_DATE],
      this.startEndDate[this.END_DATE],
    );

    const hourMinute = this.dateTimePickerService.getTimeAmPm(
      this.startEndDate[this.END_DATE],
    );

    const repeat = this.getRepeatedDays(this.daysCircle);
    const chatDateTimeMessage = date + '<br/>' + hourMinute + '<br/>' + repeat;
    this.closeModal();
    const dateTimeValues = [
      {
        start_date: this.dateToString(this.startEndDate[this.START_DATE]),
        time: utcTime,
        end_date: this.dateToString(this.startEndDate[this.END_DATE]),
        days: this.formDataDays,
      },
    ];
    const dateTimeSelected = {
      dateTimeMessage: chatDateTimeMessage,
      dateTimeValues: dateTimeValues,
    };
    console.log(dateTimeSelected);
    this.dateTimeMessage.emit(dateTimeSelected);
    this.dateTimeSubmit.emit();

    if (this.dialogRef) {
      const fromDateTimeData = {
        dateTime: this.formDateTime,
        showDateTimePicker: false,
      };
      this.dialogRef.close({ event: 'close', data: fromDateTimeData });
    }
  }

  dateToString(date: Date) {
    // const gmtDateTime = moment.utc(date);
    const localDate = moment(date).format('YYYY-MM-DD');
    return localDate.toString();
  }

  timeToString(date: Date) {
    const gmtDateTime = moment.utc(date, 'hh:mm');
    const localTime = gmtDateTime.format('hh:mm');

    return localTime.toString();
  }

  getRepeatedDays(days: Day[]): string {
    const repeatedDays: string[] = [];
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

  get showWhenStart() {
    return this.startEndDate.length === 0;
  }

  get showTillWhen() {
    return (
      this.startEndDate[this.END_DATE] === null && this.startEndDate.length > 1
    );
  }

  get showStartEndDate() {
    return (
      this.startEndDate[this.END_DATE] !== null &&
      this.startEndDate[this.START_DATE] !== null &&
      this.startEndDate.length === 2
    );
  }
}
