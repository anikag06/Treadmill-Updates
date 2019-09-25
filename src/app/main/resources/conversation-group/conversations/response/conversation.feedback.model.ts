export class ConversationFeedback {
    constructor(
        public initial_feedback_state: number,
        public final_feedback_state: number,
        public conversation_id: number,
    ) {}

}

export class ConversationFeedbackText {
    constructor(
        public feedback_text: string
    ) {}
}
