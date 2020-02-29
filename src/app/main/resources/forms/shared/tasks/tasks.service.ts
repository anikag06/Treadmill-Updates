import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserTask } from '@/main/resources/forms/shared/tasks/user-task.model';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: UserTask[] = [];
  page = 1;
  nextPage = true;
  taskBehaviour = new BehaviorSubject<UserTask[]>(this.tasks);

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {}

  getTasks() {
    if (this.nextPage) {
      this.http
        .get(
          environment.API_ENDPOINT + '/api/v1/tasks/listing/?page=' + this.page,
        )
        .subscribe((data: any) => {
          if (this.page === 1) {
            this.tasks = [];
          }
          this.tasks.push(...data.results);
          this.taskBehaviour.next(this.tasks);
          if (data.next) {
            this.page += 1;
            this.nextPage = true;
            setTimeout(() => {
              this.getTasks();
            }, 10);
          } else {
            this.nextPage = false;
          }
        });
    }
  }

  postTask(data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      environment.API_ENDPOINT + '/api/v1/tasks/task/',
      data,
      {
        observe: 'response',
      },
    );
  }

  putTask(data: any, id: number): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      environment.API_ENDPOINT + '/api/v1/tasks/task/' + id + '/',
      data,
      {
        observe: 'response',
      },
    );
  }

  addTask(task: UserTask) {
    this.tasks.push(task);
    this.taskBehaviour.next(this.tasks);
  }

  removeTask(userTask: UserTask) {
    let taskIndex = -1;
    this.tasks.forEach((task: UserTask, index) => {
      if (task.id === userTask.id) {
        taskIndex = index;
      }
    });
    if (taskIndex > -1) {
      this.tasks.splice(taskIndex);
    }
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
    return this.http.delete(
      environment.API_ENDPOINT +
        '/api/v1/tasks/task/' +
        task_id +
        '/sub-task/?subtask_id=' +
        subtask_id,
      {
        observe: 'response',
      },
    );
  }

  deleteTask(task_id: number): Observable<HttpResponse<any>> {
    return this.http.delete(
      environment.API_ENDPOINT + '/api/v1/tasks/task/' + task_id + '/',
      {
        observe: 'response',
      },
    );
  }

  // deleteTaskDay(task_id: number, day: string) {
  //   return this.http
  //     .delete(environment.API_ENDPOINT +
  //       '/api/v1/tasks/task/' +
  //       task_id + '/task-days/?day=' + day);
  // }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
