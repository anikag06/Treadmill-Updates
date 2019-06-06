import { UserSubTask } from '@/main/forms/problem-solving-worksheets/tasks/user-sub-task.model';

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
