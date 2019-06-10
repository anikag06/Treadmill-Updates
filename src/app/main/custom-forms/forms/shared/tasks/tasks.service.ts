import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {BehaviorSubject} from 'rxjs';
import {Task} from 'protractor/built/taskScheduler';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Task[] = [];
  taskBehaviour = new BehaviorSubject<Task[]>(this.tasks);

  constructor(
    private http: HttpClient,
  ) { }

  getTasks(page: number) {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/tasks/listing/?page=' + page)
      .subscribe(
        (data: any) => {
          this.tasks.push(...data.results);
          this.taskBehaviour.next([...this.tasks]);
          return <Task[]>data.results;
        }
      );
  }
}
