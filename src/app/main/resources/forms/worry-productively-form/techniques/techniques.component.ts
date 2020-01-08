import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EvaluateWorryComponent } from './evaluate-worry/evaluate-worry.component';
import { ModifyBeliefsComponent }  from './modify-beliefs/modify-beliefs.component';
import { WpfProblemSolvingComponent } from './wpf-problem-solving/wpf-problem-solving.component';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { TECHNIQUE_UNTOUCHED, TECHNIQUE_OPENED, TECHNIQUE_CLOSED } from "@/app.constants";
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { TechniqueInfoComponent } from './technique-info/technique-info.component'
@Component({
  selector: 'app-techniques',
  templateUrl: './techniques.component.html',
  styleUrls: ['./techniques.component.scss'],
})
export class TechniquesComponent implements OnInit {
  @ViewChild('doneBtn', { static: false }) doneBtn!: ElementRef;  
  constructor(
    private matIconRegistry: MatIconRegistry,    
    private domSanitizer: DomSanitizer,
    private dialogBoxService: DialogBoxService    
  ) {
      this.matIconRegistry.addSvgIcon(    
      "Info",      
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../../assets/forms/Info.svg"));
      this.matIconRegistry.addSvgIcon(
      "EditErrors",        
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../../assets/forms/EditErrors.svg"));
      this.matIconRegistry.addSvgIcon(
      "Close",        
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../../assets/forms/Close.svg")); 
      this.matIconRegistry.addSvgIcon(
      "QuestionMark",        
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../../assets/forms/QuestionMark.svg"));  
  }

  ngOnInit() {}
  public ifevaluatedclicked = false;
  public beliefsClicked = false;
  public solveProbClicked = false;
  public dealWithWorry = false;
  panelOpenState1 = 0;
  panelOpenState2 = 0;
  panelOpenState3 = 0;
  panelOpenState4 = 0;
  panelOpenState5 = 0;
  
  EvaluateClick() {
    this.ifevaluatedclicked = true;
    // this.panelOpenState = 2;
  }
  BeliefsClick(){
    this.beliefsClicked = true;
    console.log(this.beliefsClicked);
  }
  solveProbClick(){
    this.solveProbClicked = true;
  }
  DealwithWorryClick(){
    this.dealWithWorry = true;
  }
  TechniqueInfo(){    
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.doneBtn.nativeElement.dispatchEvent(domEvent);
    this.dialogBoxService.setDialogChild(TechniqueInfoComponent);
  }
}
