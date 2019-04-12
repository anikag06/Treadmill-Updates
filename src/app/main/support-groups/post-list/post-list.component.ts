import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { SupportGroupsService } from '../support-groups.service';
import { Subscription } from 'rxjs';
import { SupportGroupItem } from '../support-group-item.model';
import { ApiResponse } from '@/main/shared/apiResponse.model';
import { ActivatedRoute } from '@angular/router';
import { ScrollingService } from '@/main/shared/scrolling.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: SupportGroupItem[] = [];
  newPosts: SupportGroupItem[] = [];
  sgServiceSubscription!: Subscription;
  newSgServiceSubscription!: Subscription;
  scrollSubcscription!: Subscription;
  page = 1;
  morePosts = true;
  fetching = false;
  tag: string | null =  null;

  constructor(
    private sgService: SupportGroupsService,
    private route: ActivatedRoute,
    private scrollService: ScrollingService
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(
        (data) => {
          this.tag = data.tags;
          this.posts = [];
          this.page = 1;
          this.morePosts = true;
          this.getPosts();
        }
      )
    this.newSgServiceSubscription =  this.sgService.supportGroupItem$
      .subscribe(
        (sgItem: SupportGroupItem) => {
          if (!isNaN(sgItem.id)) {
            this.newPosts.unshift(sgItem);
          }
        }
      );
    this.scrollService.scrollingBehaviour
        .subscribe(
          (i: number) => this.onScroll(i)
        );
  }

  ngOnDestroy() {
    this.sgServiceSubscription.unsubscribe();
    this.newSgServiceSubscription.unsubscribe();
    this.scrollSubcscription.unsubscribe();
  }


  getPosts() {
    if (this.morePosts) {
      this.fetching = true;
      this.sgServiceSubscription = this.sgService.getPosts(this.page, this.tag)
        .subscribe(
          (data) => {
            const response = <ApiResponse>data;
            if (response.next == null) {
              this.morePosts = false;
            } else {
              this.morePosts = true;
              this.page += 1;
            }
            this.posts.push(...<SupportGroupItem[]>response.results);
            this.fetching = false;
          }
        );
    }
  }

  onScroll(scrollPercent: number) {
    if (scrollPercent > 90.00 && this.fetching === false) {
      this.getPosts();
    }
  }

  onItemDeletion(sgi: SupportGroupItem) {
    const data = { post_id: sgi.id }
    this.sgService.deletePost(data)
      .then(
        (xhr: XMLHttpRequest) => {
          xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 204) {
              this.posts = this.posts.filter(post => {
                return post.id !== sgi.id;
              });
            } else {
              console.error(xhr);
            }
          }
        }
      );
  }
}
