import { QuestionnaireResponse } from './questionnaire-response.model';

export class QuesUserResponseArray {
  constructor(public user_response: Array<QuestionnaireResponse>) {
    this.user_response = [];
  }
}
