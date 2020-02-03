export interface StepData {
  data: any;
  type: string;
}

export interface Step {
  id: number;
  sequence: number;
  name: string;
  status: string;
  step_data: StepData;
  step_group_sequence: number;
  hooks: string[];
  action: string[];
  virtual_step: boolean;
  data_type: string;
}
