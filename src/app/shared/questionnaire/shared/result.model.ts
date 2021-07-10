export class Result {
  constructor(
    public userScore : number,
    public resultRemark: string,
    public totalScore: number,
    public definitionText: string,
    public disorder: string,
    public referenceTable: refTable[],

  ) {}
}

export class refTable {
  constructor(
    public minValue: number,
    public maxValue: number,
    public refRemark: string,
  ) {}
}
