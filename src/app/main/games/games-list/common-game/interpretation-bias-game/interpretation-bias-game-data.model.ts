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
