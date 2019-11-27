import { Scenario } from './scenario.model';

export class Level {
    constructor(
        public order: number,
        public title: string,
        public scenario: Scenario[],
    ){}
}