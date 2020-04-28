// for storing interpretation bias game
import * as moment from "moment";
import _date = moment.unitOfTime._date;

export class IBGameUserScore {
  constructor(
    public order: number,
    public level: number,
    public score: number,
    public streak: number,
    public time: number,
    public words_hidden: number,
  ) {}
}

export class IBGameUserResponse {
  constructor(
    public sentence: number,
    public user_response: boolean,
    public response_time: number,
  ) {}
}

// for storing executive control game info
export class ECGameData {
  constructor(
    public id: number,
    public end_time: any,
    public level: number,
    public score: number,
    public game_over: boolean,
    public lives_renewed: number,
  ) {}
}
export class ECGameUserData {
  constructor(
    public game_id: number,
    public max_score: number,
    public coins_collected: number,
    public double_jump: boolean,
    public shooting_capacity: boolean,
    public double_coins: boolean,
  ) {}
}

export class ECGameFlankerTask {
  constructor(
    public game_id: number,
    public starting_time: any,
    public time_elapsed: number,
    public response_type: number,
    public image_type: number,
    public congruency: number,
  ) {}
}

export class ECGameDiscriminationTask {
  constructor(
    public flanker_task_id: number,
    public starting_time: any,
    public time_elapsed: number,
    public response_type: number,
  ) {}
}

// for storing data of learned helplessness game

export class LHGameColorReverseData {
  constructor(
    public level: number,
    public time_spent: number,
    public no_of_moves: number,
    public success: boolean,
  ) {}
}
export class LHGameUserLevel {
  constructor(public level: number) {}
}
export class LHGamePerformance {
  constructor(
    public time_to_give_up: number,
    public no_of_moves: number,
    public no_of_resets: number,
  ) {}
}

export class LHGameOverallData {
  constructor(
    public end_time: any,
    public game_completed: boolean,
    public all_levels_completed: boolean,
  ) {}
}

// for storing data of Friendly Face Game

export class FFGameUserData {
  constructor(
    public score: number,
    public last_completed_order: number,
    public time_per_note: number,
  ) {}
}
export class FFGamePerformance {
  constructor(
    public grid_rows: number,
    public order: number,
    public device_type: string,
    public no_of_positive_images: number,
    public total_time_taken: number,
    public completed: boolean,
  ) {}
}

export class MIGameUserData {
  constructor(
    public game_sentence_id: number,
    public score: number,
    public answer: string,
    public answer_correct: boolean,
    public start_time: any,
    public end_time: any,
  ) {}
}
export class ICDGameUserData {
  constructor(
    public last_completed_order: number,
    public points: number,
    public time: number,
  ) {}
}

export class ICDGameUserAnswerData {
  constructor(
    public situation_distortion_map_id: number,
    public situation_displayed_at: any,
    public answered_at: any,
  ) {}
}

// for storing data of ASG
class ASGanswer {
  id!: number;
  question_id!: number;
  answer_text!: string;

  constructor(q: any){
    this.id = q.id;
    this.question_id = q.question_id;
    this.answer_text = q.answer_text;
  }
}

class ASGQuestions {
  id!: number;
  level!: number;
  question_text!: string;
  order!: number;

  constructor(q: any){
    this.id = q.id;
    this.level = q.level;
    this.question_text = q.question_text;
    this.order = q.order;
  }
}

export class ASGQuestionData {
  count!: number;
  next!: any;
  previous!: any;
  results!: ASGQuestions[];

  constructor(data: any) {
    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    this.results = [];
    data.results.forEach((q: any) => {
      this.results.push( new ASGQuestions(q));
    });
  }
}

export class ASGAnswerData {
  count!: number;
  next!: any;
  previous!: any;
  results!: ASGanswer[];

  constructor(data: any) {
    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    this.results = [];
    data.results.forEach((q: any) => {
      this.results.push( new ASGanswer(q));
    });
  }
}

export class ASGExplanation {
  count!: number;
  next!: any;
  previous!: any;
  results!: ASGexplanationdata[];

  constructor(data: any) {
    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    this.results = [];
    data.results.forEach((q: any) => {
      this.results.push( new ASGexplanationdata(q));
    });
  }
}

class ASGexplanationdata {
  id!: number;
  explanation_text!: string;

  constructor(q: any) {
    this.id = q.id;
    this.explanation_text = q.level;
  }
}

export class ASGGetUserPerformance {
  id!: number;
  completed!: boolean;
  show_summary_button!: boolean;
  end_time!: Date;

  constructor(q: any) {
    this.id =  q.id;
    this.completed = q.completed;
    this.show_summary_button = q.show_summary_button;
    this.end_time = q.end_time;
  }

}

export class ASGLevelPerformance {
  constructor (
    public game_instance_id: number,
    public level_id: number,
    public total_balloons: number,
    public balloons_burst: number,
    public total_arrows_fired: number,

  ) {}
}

export class ASGIndividualAnswer {
  constructor (
    public game_instance_id: number,
    public answer_id: number,
    public time_taken_to_answer: number,

  ) {}
}

export class ASGSaveExplanation {
  constructor (
    public answer_1_id: number,
    public answer_2_id: number,
    public explanation_id: number,
  ) {}
}
