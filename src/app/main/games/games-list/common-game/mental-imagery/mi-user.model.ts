export class MIUser {
    constructor(
        public username: string,
        public level: number,
        public points: number[],
        public lastPlayed: any,
    ) {
        // this.level = 0;
    }


    currentPoints() {
        if (this.points.length > 0) {
            return this.points.reduce((num, total) => total +  num);
        } else {
            return 0;
        }
    }

}