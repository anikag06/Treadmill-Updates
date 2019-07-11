import { UserSubTask } from '@/main/resources/forms/shared/tasks/user-sub-task.model';

export class UserTask {
  constructor(
    public  id: number,
    public  name: string,
    public  is_completed: boolean,
    public date_time: Date,
    public sub_tasks: UserSubTask[],
    public task_days: String[],
    public origin_name: string,
    public origin_object: number,
  ) {}
}
