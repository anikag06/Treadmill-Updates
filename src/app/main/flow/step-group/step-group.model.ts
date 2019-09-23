import { Step } from './step/step.model';

export interface StepGroup {
    id: number;
    sequence: number;
    name: string;
    status: string;
    steps: Step[];
}
