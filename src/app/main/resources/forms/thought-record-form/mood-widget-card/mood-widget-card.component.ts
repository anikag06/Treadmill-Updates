import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MoodTrackerComponent} from '@/main/shared/mood-tracker/mood-tracker.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-mood-widget-card',
  templateUrl: './mood-widget-card.component.html',
  styleUrls: ['./mood-widget-card.component.scss']
})
export class MoodWidgetCardComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }
  showMoodWidget:boolean = false;
  showContinueButton = false;
  selectedMood = "feeling sad";
  submitted = false;
  @Output() onShowRecordBehave = new EventEmitter();
  @Input() header!: string;
  @Input() showMood!: string;
  ngOnInit() {
  }
  onShowMoodWidget(){
    this.showMoodWidget = !this.showMoodWidget;
    const dialogRef = this.dialog.open(MoodTrackerComponent, {
      panelClass: "moodTracker-dialog-container",
       maxWidth: '100vw',
       autoFocus: false
    });
   dialogRef.afterClosed().subscribe(()=>{
    this.showContinueButton = true;
   
   })
  }

  onMoodSubmit(){
    this.submitted = true;
    this.onShowRecordBehave.emit(true)
  }

  onChangeMood(){

  }
  
    
  
}
