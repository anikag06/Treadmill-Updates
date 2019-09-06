import { ProsCons } from './pros-cons.model';

export class Solution {

    public pros: ProsCons[];
    public cons: ProsCons[];
    constructor(
        public id: number,
        public problem: number,
        public solution: string,
        public best_solution: boolean,
        public rank: number,
    ) {
        this.pros = [];
        this.cons = [];
    }
}
