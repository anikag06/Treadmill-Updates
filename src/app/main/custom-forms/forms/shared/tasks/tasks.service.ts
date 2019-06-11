import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';
import {BehaviorSubject} from 'rxjs';
import {UserTask} from '@/main/custom-forms/forms/shared/tasks/user-task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: UserTask[] = [];
  page = 1;
  nextPage = true;
  taskBehaviour = new BehaviorSubject<UserTask[]>(this.tasks);

  constructor(
    private http: HttpClient,
  ) {}

  getTasks() {
    if (this.nextPage) {
      this.http.get(environment.API_ENDPOINT + '/api/v1/tasks/listing/?page=' + this.page)
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
    return this.http.post(environment.API_ENDPOINT + '/api/v1/tasks/task/', data);
  }

  addTask(task: UserTask) {
    this.tasks.push(task);
    this.taskBehaviour.next(this.tasks);
  }
}
