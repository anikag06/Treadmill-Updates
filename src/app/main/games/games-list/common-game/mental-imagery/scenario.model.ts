export class Scenario {
    constructor(
        public problemBeforeDash: string,
        public problemAfterDash: string,
        // public points: number,
        public scenarioNext: Scenario | null,
        public wrongText: string,
        public correctText: string | null
    ) {}
}