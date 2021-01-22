import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Tag } from './tag.model';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './apiResponse.model';
import { Subscription } from 'rxjs';
import { SUPPORT_GROUP_TAGS_LIST } from '@/app.constants';
import { TagGroup } from './tag-group.model';

@Injectable({
  providedIn: 'root',
})
export class TagService implements OnInit, OnDestroy {
  tags: Tag[] = [];
  tagsGroup: TagGroup[] = [];
  tagSubscription!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getTags() {
    this.tagSubscription = this.http
      .get(environment.API_ENDPOINT + SUPPORT_GROUP_TAGS_LIST)
      .subscribe(data => {
        const response = <ApiResponse>data;
        this.tagsGroup = <TagGroup[]>response.results;
        let i = 0;
        while (i < this.tagsGroup.length) {
          let j = 0;
          while (j < this.tagsGroup[i].tags_list.length) {
            this.tags.push(this.tagsGroup[i].tags_list[j]);
            j++;
          }

          i++;
        }
      });
  }

  ngOnDestroy() {
    this.tagSubscription.unsubscribe();
  }
}
