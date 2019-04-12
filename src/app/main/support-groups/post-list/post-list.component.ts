import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { SupportGroupsService } from '../support-groups.service';
import { Subscription } from 'rxjs';
import { SupportGroupItem } from '../support-group-item.model';
import { ApiResponse } from '@/main/shared/apiResponse.model';
import { ActivatedRoute } from '@angular/router';

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
  page = 1;
  morePosts = true;
  fetching = false;
  tag: string | null =  null;

  constructor(
    private sgService: SupportGroupsService,
    private route: ActivatedRoute

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
  }

  ngOnDestroy() {
    this.sgServiceSubscription.unsubscribe();
    this.newSgServiceSubscription.unsubscribe();
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

  getScrollPercent() {
    const h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
        return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (this.getScrollPercent() > 90.00 && !this.fetching) {
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
