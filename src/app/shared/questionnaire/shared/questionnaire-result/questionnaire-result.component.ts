import {Component, Input, OnInit} from "@angular/core";
import {Result} from "@/shared/questionnaire/shared/result.model";
import {QuestionnaireService} from "@/shared/questionnaire/questionnaire.service";
import {RefTable} from "@/shared/questionnaire/shared/reference-table.model";

@Component({
  selector: 'app-questionnaire-result',
  templateUrl: './questionnaire-result.component.html',
  styleUrls: ['./questionnaire-result.component.scss'],
})

export class QuestionnaireResultComponent implements OnInit {
  @Input() resultData: any;
  @Input() fromUserResponse: any;

  showEmailBox = false;
  resultItem: Result[] = [];
  refTableArray: any = [];
  disorderArray: any = [];

  showResultComponent = false;
  @Input() refList: any;



  constructor(
    private questionnaireService: QuestionnaireService,
  ) {}

  ngOnInit() {
    console.log('result data', this.resultData);
    console.log('from user response', this.fromUserResponse);
    this.questionnaireService.sendResultEvent
      .subscribe((data: any) => {
        // console.log('result data from passing- passing successful', data);
        // console.log('result page', data.result);
        // data.result.forEach((element: any) => {
        //   this.resultItem.push(<Result>element);
        //   //this.refTableArray[element.disorder]
        //   console.log('each result', this.resultItem);
        // })
        data.result.result.forEach((e: any) => {
          this.resultItem.push(e);
          console.log('result item', this.resultItem);
        });
        data.result.reference_table.forEach((e: any) => {
          this.refTableArray.push(e);
          console.log('ref item', this.refTableArray);
        });

       // this.resultItem.push(<Result>data.result); //commented later
        // data.result.data.forEach((e: any) => {
        //
        // })
        //this.resultItem.push(<Result>data);
        //commented later
        // this.resultItem.forEach((e: any) => {
        //   this.refTableArray.push(<RefTable>e.reference_table);
        //   console.log('ref array data', this.refTableArray);
        //   this.disorderArray.push(e.disorder);
        //   console.log('disorder array', this.disorderArray);
        //   }
        // )
        // console.log('result item', this.resultItem);
        // console.log('disorder name', this.resultItem[0].reference_table, this.resultItem[0].user_score);
        // this.resultItem[0].reference_table.forEach((e: any) => {
        //   console.log('ref table data', e);
        // })
        //till here
        console.log('result data', this.resultData.user_result);
        this.resultData.user_result.forEach((element: any) => {
          this.resultItem.push(element);
          console.log('res item', this.resultItem);
          //this.refTableArray[element.disorder]
        });
        this.refList.forEach((e: any) => {
          this.refTableArray.push(e);
          console.log('ref array data', this.refTableArray);
        });
      });

  }

  expandEmail(){
    this.showEmailBox = !this.showEmailBox;
  }

  printResult(){

  }
  viewResultClick() {
    console.log('view result clicked');
    this.showResultComponent = !this.showResultComponent;
  }
}
