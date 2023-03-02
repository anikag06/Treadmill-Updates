import {RefTable} from "@/shared/questionnaire/shared/reference-table.model";

export class Result {
  constructor(
    public user_score : number,
    public result_remark: string,
    public total_score: number,
    public definition: string,
    public disorder: string,
    public reference_table: RefTable[],

  ) {}
}

