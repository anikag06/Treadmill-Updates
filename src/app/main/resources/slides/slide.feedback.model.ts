export class SlidesFeedback {
    constructor(
        public initial_feedback_state: number,
        public final_feedback_state: number,
        public slide_id: number,
    ) {}

}

export class SlidesFeedbackText {
    constructor(
        public feedback_text: string
    ) {}
}
