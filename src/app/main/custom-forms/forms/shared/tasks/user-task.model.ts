import { UserSubTask } from '@/main/custom-forms/forms/shared/tasks/user-sub-task.model';

export class UserTask {
  constructor(
    public  id: number,
    public  name: string,
    public  is_completed: boolean,
    public date_time: Date,
    public subtasks: UserSubTask[],
    public task_days: String[]
  ) {}
}
