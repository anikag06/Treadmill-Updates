export class GamesBar {
  public name: string;
  public started: boolean;
  public no_of_correct_answers: number;
  public BRONZE_CONSTANT: number;
  public SILVER_CONSTANT: number;
  public GOLD_CONSTANT: number;
  public week_start: string;
  public week_end: string;

  constructor(name: string, started: boolean, no_of_correct_answers: number, BRONZE_CONSTANT: number,
              SILVER_CONSTANT: number, GOLD_CONSTANT: number, week_start: string, week_end: string) {
    this.name = name;
    this.started = started;
    this.no_of_correct_answers = no_of_correct_answers;
    this.BRONZE_CONSTANT = BRONZE_CONSTANT;
    this.SILVER_CONSTANT = SILVER_CONSTANT;
    this.GOLD_CONSTANT = GOLD_CONSTANT;
    this.week_start = week_start;
    this.week_end = week_end;
  }

}
