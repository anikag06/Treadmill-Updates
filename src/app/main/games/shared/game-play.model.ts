// for storing executive control game info
export class ECGameData {
    constructor(
        public game_id: number,
        public start_time: any,
        public level: number,
        public score: number,
        public end_time: any,
        public game_over: boolean,
    ) { }
}
export class ECGameUserData {
    constructor(
        public game_id: number,
        public max_score: number,
        public coins_collected: number,
        public double_jump: boolean,
        public shooting_capacity: boolean,
        public double_coins: boolean
    ) {   }
}

export class ECGameFlankerTask {
    constructor(
        public game_id: number,
        public starting_time: any,
        public time_elasped: number,
        public response_type: number,
        public image_type: number,
        public congruency: number
    ) {}
}

export class ECGameDiscriminationTask {
    constructor(
        public game_id: number,
        public starting_time: any,
        public time_elasped: number,
        public response_type: number
    ) {}
}
