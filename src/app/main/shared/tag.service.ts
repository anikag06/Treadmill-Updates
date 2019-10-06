import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Tag } from './tag.model';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './apiResponse.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService implements OnInit, OnDestroy {

  tags: Tag[] = [];
  tagSubscription!: Subscription;

  constructor(
      private http: HttpClient
    ) { }

  ngOnInit(): void {}


  getTags() {
    this.tagSubscription = this.http.get(environment.API_ENDPOINT + '/api/v1/support-group/tags-list/')
      .subscribe(
        (data) => {
          const response = <ApiResponse>data;
          this.tags = <Tag[]>response.results;
        }
      );
  }

  ngOnDestroy() {
    this.tagSubscription.unsubscribe();
  }
}
