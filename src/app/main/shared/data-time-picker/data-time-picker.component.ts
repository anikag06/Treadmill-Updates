import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Day } from './day.model';



@Component({
  selector: 'app-data-time-picker',
  templateUrl: './data-time-picker.component.html',
  styleUrls: ['./data-time-picker.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class DataTimePickerComponent implements OnInit, AfterViewInit,OnChanges {
  @Output() onClose = new EventEmitter();
  public min = new Date();
  public startDate!: Date;
  public endDate: Date = new Date();
  public startAt: Date = new Date();
  
  public startEndDate: string[] = [];
  public showDays = false;
  public days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  public daysCircle: Day[] = [];

  constructor(
    private element: ElementRef,
  ) {
    
  }

  ngOnInit() {
    this.days.forEach(day => {
      let newDay = new Day(day, true);
      this.daysCircle.push(newDay);

    });
  
  }



  ngAfterViewInit() {
    let dateTimepicker = this.element.nativeElement.querySelectorAll('.owl-dt-inline-container');
    let removeFromToDate = this.element.nativeElement.querySelectorAll('.owl-dt-container-info');
    dateTimepicker[0].setAttribute('style', 'box-shadow:none');
    removeFromToDate[0].setAttribute('style', 'display:none');
  }

  ngOnChanges(){
    let selectedDates   =  this.element.nativeElement.querySelectorAll('.owl-dt-calendar-table .owl-dt-calendar-cell-today:not(.owl-dt-calendar-cell-selected)');
    selectedDates[0].setAttribute('style','background-color: #00BDDE');

  }

  onShowDays() {
    // if (this.showDays && (this.startEndDate[1] === null || this.startEndDate[1] === undefined)) {

    // }
    this.showDays = !this.showDays;

    console.log( this.startEndDate)
  }
  onDaySelected(index: number) {

    this.daysCircle[index].selected = !this.daysCircle[index].selected;
  }

  closeModal(){
    this.onClose.emit();
  }

}
