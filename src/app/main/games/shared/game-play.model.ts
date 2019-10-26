// for storing interpretation bias game
export class UserScoreData {

    constructor(
         public order: number,
         public level: number,
         public score: number,
         public streak: number,
         public time: number,
         public words_hidden: number) {

     }
 }

 export class UserResponseData {
     constructor(
         public sentence: number,
         public user_response: boolean,
         public response_time: number) {
     }
 }

// for storing executive control game info
export class ECGameData {
    constructor(
        public game_id: number,
        public start_time: any,
        public level: number,
        public score: number,
        public end_time: any,
        public game_over: boolean) {

    }
}
export class ECGameUserData {
    constructor(
        public game_id: number,
        public max_score: number,
        public coins_collected: number,
        public double_jump: boolean,
        public shooting_capacity: boolean,
        public double_coins: boolean) {

    }
}

export class ECGameFlankerTask {
    constructor(
        public game_id: number,
        public starting_time: any,
        public time_elapsed: number,
        public response_type: number,
        public image_type: number,
        public congruency: number) {

    }
}

export class ECGameDiscriminationTask {
    constructor(
        public flanker_task_id: number,
        public starting_time: any,
        public time_elapsed: number,
        public response_type: number) {

    }
}

// for storing data of learned helplessness game

export class LHGameColorReverseData {
    constructor(
        public level: number,
        public time_spent: number,
        public no_of_moves: number,
        public success: boolean) {

    }
}
export class LHGameUserLevel {
    constructor(
        public level: number) {

    }
}
export class LHGamePerformance {
    constructor(
        public time_to_give_up: number,
        public no_of_moves: number,
        public no_of_resets: number) {

    }
}

// for storing data of Friendly Face Game

export class FFGameUserData {
    constructor(
        public coins: number,
        public last_order: number
    ) {

    }
}
export class FFGamePerformance {
    constructor(
        public grid_rows: number,
        public order: number,
        public device_type: string,
        public no_of_positive_images: number,
        public total_time_taken: number
    ) {

    }
}
