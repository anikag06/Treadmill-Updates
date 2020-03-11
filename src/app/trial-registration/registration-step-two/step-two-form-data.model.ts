// for storing form data of the step two form

export class RegistrationStepTwoForm {
  constructor(
    public participant_id: number,
    public age: number,
    public gender: any,
    public education: number,
    public occupation: number,
    public country: number,
    public english: any,
    public tech_access: any,
    public secondary_help: any,
    public have_used_earlier: any,
    public psychosis_or_bipolar: any,
    public traumatic_event: any,
    public source_of_information: number,
    public joining_for_help: any,
    public plans_to_complete: number,
    public started_at: any,
    public completed_at: any,
    public time_zone: any,
    public source_of_information_other: any,
  ) {}
}
