import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateTimePickerService {
  constructor() {}
  getTimeAmPm(endDate: Date): string {
    let time = endDate.getHours();
    let ampm = time >= 12 ? ' pm' : ' am';
    let timeIn12 = '';
    if (time > 12) {
      time %= 12;
      timeIn12 = '0' + time.toString();
    } else {
      timeIn12 = time.toString();
    }

    let minutes = endDate.getMinutes();
    let minutes_str = minutes.toString();
    if (minutes < 10) {
      minutes_str = '0' + minutes_str;
    }
    return 'Time:' + timeIn12 + ':' + minutes_str + ampm;
  }

  getDateRange(startDate: Date, endDate: Date): string {
    let fromDate =
      startDate.getDate().toString() +
      '-' +
      (startDate.getMonth() + 1).toString() +
      '-' +
      startDate
        .getUTCFullYear()
        .toString()
        .substr(-2);
    let toDate =
      endDate.getDate().toString() +
      '-' +
      (endDate.getMonth() + 1).toString() +
      '-' +
      endDate
        .getUTCFullYear()
        .toString()
        .substr(-2);
    return 'Date:' + fromDate + ' to ' + toDate;
  }

  getUTCTime(endDate: Date): string {
    let utcTime =
      endDate.getUTCHours().toString() +
      ':' +
      endDate.getUTCMinutes().toString() +
      ':' +
      endDate.getUTCSeconds().toString();

    return utcTime;
  }

  getUTCTimeInAmPm(endDate: Date, dateTime: Date): string {
    let utcDate = endDate + ' ' + dateTime;
    let gmtDateTime = moment.utc(utcDate, 'YYYY-MM-DD hh:mm');
    let local = gmtDateTime.local().format('hh:mm A');
    return local.toString();
  }

  getTaskDateRange(startDate: Date, endDate: Date): string {
    return (
      moment(startDate).format('DD-MMM-YYYY') +
      ' to ' +
      moment(endDate).format('DD-MMM-YYYY')
    );
  }
}
