import { QuestionnaireResponse } from '@/shared/questionnaire-deprecated/input/questionnaire-response.model';

export class RegistrationQuestionnaireScore {
  constructor(
    public participant_id: number,
    public user_response: Array<QuestionnaireResponse>,
  ) {}
}
