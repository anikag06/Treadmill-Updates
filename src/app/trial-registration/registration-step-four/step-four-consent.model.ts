export class RegistrationStepFourForm {
  constructor(
    public participant_id: number,
    public read_information_consent: any,
    public voluntary_involvement_consent: any,
    public information_confidential_consent: any,
    public information_publication_consent: any,
    public information_leakage_consent: any,
    public agreement_consent: any,
    public add_to_home_screen_consent: any,
    public notifications_consent: any,
    public started_at: any,
    public completed_at: any,
  ) {}
}
