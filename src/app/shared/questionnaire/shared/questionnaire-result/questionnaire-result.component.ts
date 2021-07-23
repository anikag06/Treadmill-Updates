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
  @Input() resultData!: string;
  showEmailBox = false;
  resultItem: Result[] = [];
  refTableArray: any = [];
  disorderArray: any = [];
  constructor(
    private questionnaireService: QuestionnaireService,
  ) {}

  ngOnInit() {
    console.log('result data', this.resultData);
    this.questionnaireService.sendResultEvent
      .subscribe((data: any) => {
        console.log('result data from passing- passing successful', data);
        console.log('result page', data.result);
        data.result.forEach((element: any) => {
          this.resultItem.push(<Result>element);
          //this.refTableArray[element.disorder]
        })
        // data.result.data.forEach((e: any) => {
        //
        // })
        //this.resultItem.push(<Result>data);
        this.resultItem.forEach((e: any) => {
          this.refTableArray.push(<RefTable>e.reference_table);
          console.log('ref array data', this.refTableArray);
          this.disorderArray.push(e.disorder);
          console.log('disorder array', this.disorderArray);
          }
        )
        console.log('result item', this.resultItem);
        console.log('disorder name', this.resultItem[0].reference_table, this.resultItem[0].user_score);
        this.resultItem[0].reference_table.forEach((e: any) => {
          console.log('ref table data', e);
        })
      })

  }

  expandEmail(){
    this.showEmailBox = !this.showEmailBox;
  }

  printResult(){

  }
}
