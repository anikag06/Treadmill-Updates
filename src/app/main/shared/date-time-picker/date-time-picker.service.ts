import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateTimePickerService {
  constructor() {}
  getTimeAmPm(endDate: Date): string {
    const time = moment(endDate).format('hh:mm A');
    return 'Time:' + time.toString();
  }

  getDateRange(startDate: Date, endDate: Date): string {
    const fromDate = moment(startDate)
      .format('DD-MM-YY')
      .toString();
    const toDate = moment(endDate)
      .format('DD-MM-YY')
      .toString();
    return 'Date:' + fromDate + ' to ' + toDate;
  }

  getUTCTime(date: Date): string {
    // const utcTime =
    //   endDate.getUTCHours().toString() +
    //   ':' +
    //   endDate.getUTCMinutes().toString() +
    //   ':' +
    //   endDate.getUTCSeconds().toString();
    //
    // return utcTime;
    return moment.utc(date).format('HH:mm:s');
  }

  getUTCTimeInAmPm(endDate: Date, dateTime: Date): string {
    const utcDate = endDate + ' ' + dateTime;
    const gmtDateTime = moment.utc(utcDate, 'YYYY-MM-DD hh:mm');
    const local = gmtDateTime.local().format('hh:mm A');
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
