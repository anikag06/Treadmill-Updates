import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { Day } from './day.model';

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
  public startEndDate: Date[] = [];
  public showDays = false;
  public days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public daysCircle: Day[] = [];
  @Output() dateTimeSubmit = new EventEmitter<any>();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.days.forEach(day => {
      let newDay = new Day(day[0], true);
      this.daysCircle.push(newDay);
    });
  }

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

  ngOnChanges() {
    let selectedDates = this.element.nativeElement.querySelectorAll(
      '.owl-dt-calendar-table .owl-dt-calendar-cell-today:not(.owl-dt-calendar-cell-selected)',
    );
    selectedDates[0].setAttribute('style', 'background-color: #00BDDE');
  }

  onShowDays() {
    this.showDays = !this.showDays;
  }
  onDaySelected(index: number) {
    this.daysCircle[index].selected = !this.daysCircle[index].selected;
  }

  closeModal() {
    this.onClose.emit();
  }

  dateTimeMessageSubmit() {
    let fromDate: string;
    let toDate: string;
    let date: string;

    fromDate =
      this.startEndDate[0].getDate().toString() +
      '-' +
      (this.startEndDate[0].getMonth() + 1).toString() +
      '-' +
      this.startEndDate[0]
        .getUTCFullYear()
        .toString()
        .substr(-2);
    toDate =
      this.startEndDate[1].getDate().toString() +
      '-' +
      (this.startEndDate[0].getMonth() + 1).toString() +
      '-' +
      this.startEndDate[1]
        .getUTCFullYear()
        .toString()
        .substr(-2);

    date = 'Date:' + fromDate + ' to ' + toDate;

    let time = this.startEndDate[1].getHours();

    let ampm = time >= 12 ? ' pm' : ' am';
    let timeIn12 = '';
    if (time > 12) {
      time %= 12;
      timeIn12 = '0' + time.toString();
    } else {
      timeIn12 = time.toString();
    }
    let minutes = this.startEndDate[1].getMinutes();
    let minutes_str = minutes.toString();
    if (minutes < 10) {
      minutes_str = '0' + minutes_str;
    }

    let hourMinute = 'Time:' + timeIn12 + ':' + minutes_str + ampm;

    let repeat = 'Repeat:';

    let repeatedDays: string[] = [];
    for (let i = 0; i < this.daysCircle.length; i++) {
      if (this.daysCircle[i].selected) {
        repeatedDays.push(this.days[i]);
      }
    }
    repeat += repeatedDays.join(',');
    let chatDateTimeMessage = date + '<br/>' + hourMinute + '<br/>' + repeat;
    this.closeModal();
    this.dateTimeMessage.emit(chatDateTimeMessage);
    this.dateTimeSubmit.emit();
  }
}
