import { ConversationGroup } from './conversation-group.model';
import { Data } from './data.model';

export interface Step {
  id: number;
  name: string;
  sequence: number;
  step_data: {
    data: Data;
    type: string;
  };
  action: any[];
  hook: any[];
  status: string;
  virtual_step: boolean;
  data_type: string;
}
