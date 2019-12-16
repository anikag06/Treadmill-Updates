import { QuestionnaireResponse } from './questionnaire-response.model';

export class QuesUserResponseArray {

  constructor(
    public user_response: Array<QuestionnaireResponse>,
  ) {
    this.user_response = [];
  }
}

export class SIQResponseData {
  constructor(
    public term_id: number,
    public user_response: Array<QuestionnaireResponse>,
  ) {  }
}
