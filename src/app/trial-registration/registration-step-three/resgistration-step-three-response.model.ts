import { QuestionnaireResponse } from '@/shared/questionnaire/input/questionnaire-response.model';

export class RegistrationQuestionnaireScore {
  constructor(
    public participant_id: number,
    public user_response: Array<QuestionnaireResponse>,
  ) {}
}
