export class SurveyOption {
    count!: number;
    next!: null;
    previous!: null;
    results!: [
        {
            id: number;
            name: string;
            score: number;
        },
        {
            id: number;
            name: string;
            score: number;
        },
        {
            id: number;
            name: string;
            score: number;
        },
        {
            id: number;
            name: string;
            score: number;
        },
    ];
}
