export class Scenario {
    constructor(
        public problemBeforeDash: string,
        public problemAfterDash: string,
        public scenarioNextIndex: number | null,
        public wrongText: string,
        public correctText: string | null
    ) {}
}