import { MOBILE_WIDTH, WEEK } from '@/app.constants';
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
  public startAt: Date = moment(new Date())
    .add(10, 'm')
    .toDate();
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
  totalSelectedDays = 0;
  isToggleChecked = false;
  mobileView!: boolean;
  smallWindow!: boolean;

  constructor(
    private element: ElementRef,
    @Optional() public dialogRef: MatDialogRef<DateTimePickerComponent>,
    private dateTimePickerService: DateTimePickerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    WEEK.forEach(day => {
      const newDay = new Day(day, false);
      this.daysCircle.push(newDay);
      this.mobileView = window.innerWidth < MOBILE_WIDTH;
      this.smallWindow = window.innerHeight < 638;
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
          if (WEEK.indexOf(this.capitalizeFirstLetter(day)) > -1) {
            indexArray.push(WEEK.indexOf(this.capitalizeFirstLetter(day)));
          }
        });
        this.daysCircle.forEach((dayCircle: Day, index) => {
          if (indexArray.indexOf(index) < 0) {
            this.daysCircle[index].selected = false;
          } else {
            this.daysCircle[index].selected = true;
            this.totalSelectedDays += 1;
          }
        });
        this.isToggleChecked = this.totalSelectedDays === 7;
        if (this.isSameDate()) {
          this.markDays(false);
        }
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
    if (this.isSameDate()) {
      this.markDays(false);
      this.formDataDays = [];
    }

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

    const date = this.dateTimePickerService.getDateRange(
      this.startEndDate[this.START_DATE],
      this.startEndDate[this.END_DATE],
    );

    const hourMinute = this.dateTimePickerService.getTimeAmPm(
      this.startEndDate[this.END_DATE],
    );

    const repeat = this.getRepeatedDays(this.daysCircle);

    this.formDateTime.push(this.formDataDays);
    const sameDate = this.isSameDate();

    // const differDateMessage =
    //   "I'll do this task at" +
    //   '<br/>' +
    //   '⏰ ' +
    //   hourMinute +
    //   '<br/>' +
    //   ' on ' +
    //   repeat +
    //   '<br/>' +
    //   ' from ' +
    //   '📅 ' +
    //   date;
    // const sameDateMessage =
    //   "I'll do this task at " +
    //   '<br/>' + 
    //   '⏰ ' +
    //   hourMinute +
    //   '<br/>' +
    //   ' on ' +
    //   repeat +
    //   '<br/>' +
    //   '📅 ' +
    //   moment(this.startDate)
    //     .format("Do MMM'YY")
    //     .toString();

    const differDateMessage =
      "I'll do this task at" +
      '<br/>' +
      '&#x23F0 ' +
      hourMinute +
      '<br/>' +
      ' on ' +
      repeat +
      '<br/>' +
      ' from ' +
      'U+1F4C5;' +
      date;
    const sameDateMessage =
      "I'll do this task at " +
      '<br/>' + 
      '&#x23F0;' +
      hourMinute +
      '<br/>' +
      ' on ' +
      repeat +
      '<br/>' +
      '&#x1F4C5;' +
      moment(this.startDate)
        .format("Do MMM'YY")
        .toString();

    const chatDateTimeMessage = sameDate ? sameDateMessage : differDateMessage;

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
        this.formDataDays.push(WEEK[i].toUpperCase());
      }
    }

    if (this.formDataDays.length < 1) {
      const day = moment(this.startEndDate[this.END_DATE])
        .format('dddd')
        .toUpperCase();
      this.formDataDays.push(day);
      repeatedDays.push(this.capitalizeFirstLetter(day));
    }

    return repeatedDays.join(', ');
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
    return !this.isSameDate() && this.isNotNullDates();
  }

  get enableButton() {
    let daySelected = false;
    for (let i = 0; i < this.daysCircle.length; i++) {
      if (this.daysCircle[i].selected) {
        daySelected = true;
      }
    }

    if (!this.isSameDate()) {
      return this.isNotNullDates() && daySelected;
    }
    return this.isNotNullDates();
  }

  capitalizeFirstLetter(day: string) {
    return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
  }

  isSameDate() {
    const startDate = moment(this.startEndDate[this.START_DATE]).format(
      'YYYY-MM-DD',
    );
    const endDate = moment(this.startEndDate[this.END_DATE]).format(
      'YYYY-MM-DD',
    );

    return startDate === endDate;
  }

  numberOfDays(): boolean {
    const days =
      moment(this.startEndDate[this.END_DATE]).diff(
        this.startEndDate[this.START_DATE],
        'days',
      ) + 1;
    return days > 6;
  }

  markDays(value: boolean) {
    this.daysCircle.forEach(day => {
      day.selected = value;
    });
  }

  isNotNullDates() {
    return (
      this.startEndDate[this.END_DATE] !== null &&
      this.startEndDate[this.START_DATE] !== null &&
      this.startEndDate.length === 2
    );
  }
}
