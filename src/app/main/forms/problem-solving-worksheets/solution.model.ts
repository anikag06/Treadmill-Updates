import { ProsCons } from './pros-cons.model';

export class Solution {

    public prosCons: ProsCons[];
    constructor(
        public id: number,
        public problem_id: number,
        public solution: string,
        public best_solution: boolean,
        public rank: number,
    ) {
        this.prosCons = [];
    }
}
