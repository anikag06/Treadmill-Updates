import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupportGroupsService } from '../support-groups.service';
import { Subscription } from 'rxjs';
import { SupportGroupItem } from '../support-group-item.model';
import { ApiResponse } from '@/main/shared/apiResponse.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollingService } from '@/main/shared/scrolling.service';
import { MatDialog } from '@angular/material';
import { CreatePostComponent } from '../create-post/create-post.component';
import { GeneralErrorService } from '@/main/shared/general-error.service';

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
  updatedSgServiceSubscription!: Subscription;
  scrollSubcscription!: Subscription;
  queryParamsSubscription!: Subscription;
  page = 1;
  morePosts = true;
  fetching = false;
  search = '';
  searchTerm = '';
  tags: string[] | null =  null;

  constructor(
    private sgService: SupportGroupsService,
    private route: ActivatedRoute,
    private router: Router,
    private scrollService: ScrollingService,
    public dialog: MatDialog,
    private errorService: GeneralErrorService
  ) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams
      .subscribe(
        (data) => {
          if (data.tags) {
            this.tags = data.tags.split(',');
          }
          this.searchTerm = data.search || '';
          this.posts = [];
          this.page = 1;
          this.morePosts = true;
          this.getPosts();
          this.tagsToSearch();
          if (this.searchTerm) {
            this.search += this.searchTerm;
          }
        }
      );
    this.newSgServiceSubscription =  this.sgService.supportGroupItem$
      .subscribe(
        (sgItem: SupportGroupItem) => {
          if (!isNaN(sgItem.id)) {
            this.newPosts.unshift(sgItem);
          }
        }
      );
    this.updatedSgServiceSubscription =  this.sgService.supportGroupItemUpdated$
      .subscribe(
        (sgItem: SupportGroupItem) => {
          if (!isNaN(sgItem.id)) {
            this.posts = this.posts.map(post => post.id === sgItem.id ? sgItem : post);
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
    this.queryParamsSubscription.unsubscribe();
    if (this.scrollSubcscription) {
      this.scrollSubcscription.unsubscribe();
    }
  }


  getPosts() {
    if (this.morePosts) {
      this.fetching = true;
      this.sgServiceSubscription = this.sgService.getPosts(this.page, this.tags, this.searchTerm)
        .subscribe(
          (data: any) => {
            const response = <ApiResponse>data;
            if (response.next == null) {
              this.morePosts = false;
            } else {
              this.morePosts = true;
              this.page += 1;
            }
            this.posts.push(...<SupportGroupItem[]>response.results);
            this.fetching = false;
          },
          this.errorService.errorResponse('Cannot fetch posts')
        );
    }
  }

  onScroll(scrollPercent: number) {
    if (scrollPercent > 90.00 && this.fetching === false) {
      this.getPosts();
    }
  }

  onItemDeletion(sgi: SupportGroupItem) {
    const data = { post_id: sgi.id };
    this.sgService.deletePost(data)
      .subscribe(
        () => {
          this.posts = this.posts.filter(post => {
            return post.id !== sgi.id;
          });
        },
        this.errorService.errorResponse('Cannot delete post')
      );
  }

  onItemEdit(sgi: SupportGroupItem) {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '90%',
      data: sgi,
    });
  }

  onSearchSubmit() {
    this.page = 1;
    this.morePosts = true;
    this.fetching = true;
    this.posts = [];
    this.searchTerm = this.search.replace(/ *\[[^\]]*]/g, '');
    this.searchToTags();
    this.navigateSearch();
  }

  tagsToSearch() {
    if (typeof(this.tags) === 'string') {
      this.search = '[' + this.tags + ']';
    } else if (typeof(this.tags) === 'object' && this.tags != null) {
      this.search = '';
      this.tags.forEach(tag => {
        this.search += '[' + tag + ']';
      });
    }
  }

  searchToTags() {
    const searchTags = <string[]>this.search.match(/\[(.*?)\]/g);
    if (searchTags && searchTags.length > 0) {
      this.tags = searchTags.map((tag) => tag.slice(1, tag.length - 1));
    }
  }

  navigateSearch() {
    const url: string = this.router.url.substring(0, this.router.url.indexOf('?')) || this.router.url;
    if (this.tags && this.tags.length > 0 && this.searchTerm.length > 0) {
      this.router.navigate([url], { queryParams: { tags: this.tags.join(','), search: this.searchTerm }});
    } else if (this.tags && this.tags.length > 0) {
      this.router.navigate([url], { queryParams: { tags: this.tags.join(',') }});
    } else if (this.searchTerm.length > 1) {
      this.router.navigate([url], { queryParams: { search: this.searchTerm }});
    } else {
      this.router.navigate(['/support-groups'], { queryParams: { tags: null, search: null }, queryParamsHandling: 'merge'});
    }
    this.getPosts();
  }

  onTagClick(tag: string) {
    if (this.tags == null) {
      this.tags = [];
    }
    if (!this.tags.find(i => i == tag)) {
      this.tags.push(tag);
      this.page = 1;
      this.morePosts = true;
      this.fetching = true;
      this.posts = [];
      this.tagsToSearch();
      this.navigateSearch();
    }
  }

  onReset() {
    this.resetParams();
    this.navigateSearch();
    this.getPosts();
  }

  resetParams() {
    this.tags = [];
    this.page = 1;
    this.morePosts = true;
    this.fetching = true;
    this.posts = [];
    this.search = '';
    this.searchTerm = '';
  }
}
