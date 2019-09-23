import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';
import {BehaviorSubject} from 'rxjs';
import {UserTask} from '@/main/resources/forms/shared/tasks/user-task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  API_ENDPOINT = 'http://172.26.90.49:9000';
  tasks: UserTask[] = [];
  page = 1;
  nextPage = true;
  taskBehaviour = new BehaviorSubject<UserTask[]>(this.tasks);

  constructor(
    private http: HttpClient,
  ) {}

  getTasks() {
    if (this.nextPage) {
      this.http.get(this.API_ENDPOINT + '/api/v1/tasks/listing/?page=' + this.page)
        .subscribe(
          (data: any) => {
            if (this.page === 1) {
              this.tasks = [];
            }
            this.tasks.push(...data.results);
            this.taskBehaviour.next(this.tasks);
            if (data.next) {
              this.page += 1;
              this.nextPage = true;
              setTimeout(() => { this.getTasks(); }, 10);
            } else {
              this.nextPage = false;
            }
          }
        );
    }
  }

  postTask(data: any) {
    return this.http.post(this.API_ENDPOINT + '/api/v1/tasks/task/', data);
  }

  putTask(data: any) {
    return this.http.put(this.API_ENDPOINT + '/api/v1/tasks/task/' + data.id + '/', data);
  }

  addTask(task: UserTask) {
    this.tasks.push(task);
    this.taskBehaviour.next(this.tasks);
  }

  updateTask(task: UserTask) {
    const userTask = this.tasks.find((t: UserTask) => t.id === task.id);
    if (userTask) {
      this.tasks[this.tasks.indexOf(userTask)] = task;
      this.taskBehaviour.next(this.tasks);
    }

  }

  deleteSubTask(task_id: number, subtask_id: number) {
    return this.http
      .delete(this.API_ENDPOINT +
        '/api/v1/tasks/task/' +
        task_id + '/sub-task/?subtask_id=' + subtask_id);
  }

  deleteTaskDay(task_id: number, day: string) {
    return this.http
      .delete(this.API_ENDPOINT +
        '/api/v1/tasks/task/' +
        task_id + '/task-days/?day=' + day);
  }
}
