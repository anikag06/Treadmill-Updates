import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Day } from './day.model';



@Component({
  selector: 'app-data-time-picker',
  templateUrl: './data-time-picker.component.html',
  styleUrls: ['./data-time-picker.component.scss'],
 
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class DataTimePickerComponent implements OnInit,AfterViewInit {
  @Output() onClose = new EventEmitter();
  public min = new Date();
  public startDate!: Date;
  public endDate!: string;
  public startEndDate :string =  new Date().toDateString();
  public showDays = false;
  public days = ['S','M','T','W','T','F','S'];
  public daysCircle: Day[] = [];
  
  constructor(
    private element: ElementRef,
  ) {
   }

  ngOnInit() {
    this.days.forEach(day => {
      let newDay = new Day(day,false);
      this.daysCircle.push(newDay);

    });
   
  }



  ngAfterViewInit(){
    let dateTimepicker = this.element.nativeElement.querySelectorAll('.owl-dt-inline-container'); 
    let removeFromToDate = this.element.nativeElement.querySelectorAll('.owl-dt-container-info'); 
    dateTimepicker[0].setAttribute('style','box-shadow:none');
    removeFromToDate[0].setAttribute('style','display:none');
   
  }

  onShowDays(){
    this.showDays = !this.showDays;
    console.log(this.startEndDate)
  }
  onDaySelected(index: number){

    this.daysCircle[index].selected = !this.daysCircle[index].selected;
  }

}
