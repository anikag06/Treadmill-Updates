import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
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
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {

  @Output() createPost = new EventEmitter<any>();
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
  tags: string[] | null = null;
  searchResultCount = 0;
  clearSearch!: boolean;

  constructor(
    private sgService: SupportGroupsService,
    private route: ActivatedRoute,
    private router: Router,
    private scrollService: ScrollingService,
    public dialog: MatDialog,
    private errorService: GeneralErrorService,
  ) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(data => {
      if (data.tags) {
        this.tags = data.tags.split(',');
      }
      this.searchTerm = data.search || '';
      this.posts = [];
      this.page = 1;
      this.morePosts = true;
      this.getPosts();
      this.tagsToSearch();
      if (this.searchTerm && this.search !== this.searchTerm) {
        this.search += this.searchTerm;
      }
    });
    this.newSgServiceSubscription = this.sgService.supportGroupItem$.subscribe(
      (sgItem: SupportGroupItem) => {
        if (!isNaN(sgItem.id)) {
          this.newPosts.unshift(sgItem);
        }
      },
    );
    this.updatedSgServiceSubscription = this.sgService.supportGroupItemUpdated$.subscribe(
      (sgItem: SupportGroupItem) => {
        if (!isNaN(sgItem.id)) {
          this.posts = this.posts.map(post =>
            post.id === sgItem.id ? sgItem : post,
          );
        }
      },
    );
    this.scrollService.scrollingBehaviour.subscribe((i: number) =>
      this.onScroll(i),
    );
    this.clearSearch = false;
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
      this.sgServiceSubscription = this.sgService
        .getPosts(this.page, this.tags, this.searchTerm)
        .subscribe((data: any) => {
          console.log('DATA', data);

          const response = <ApiResponse>data;
          this.searchResultCount = response.count;
          if (response.next == null) {
            this.morePosts = false;
          } else {
            this.morePosts = true;
            this.page += 1;
          }
          const fetchedPosts = <SupportGroupItem[]>response.results;
          this.posts = this.arrayUnique([...this.posts, ...fetchedPosts]);
          this.fetching = false;
        }, this.errorService.errorResponse('Cannot fetch posts'));
    }
  }

  onScroll(scrollPercent: number) {
    if (scrollPercent > 90.0 && this.fetching === false) {
      this.getPosts();
    }
  }

  onItemDeletion(sgi: SupportGroupItem) {
    const data = { post_id: sgi.id };
    this.sgService.deletePost(data).subscribe(() => {
      this.posts = this.posts.filter(post => {
        return post.id !== sgi.id;
      });

      this.newPosts = this.newPosts.filter(post => {
        return post.id !== sgi.id;
      });
    }, this.errorService.errorResponse('Cannot delete post'));
  }

  onItemEdit(sgi: SupportGroupItem) {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '90%',
      data: sgi,
    });
  }

  onSearchSubmit() {
    if (this.fetching === false) {
      this.page = 1;
      this.morePosts = true;
      this.posts = [];
      this.searchTerm = this.search.replace(/ *\[[^\]]*]/g, '');
      this.searchToTags();
      setTimeout(() => {
        this.navigateSearch();
      }, 200);
    }
    if (this.searchTerm !== "") {
      this.clearSearch = true;
    }

  }

  /**
   * Tags array to search
   */
  tagsToSearch() {
    if (typeof this.tags === 'string') {
      this.search = '[' + this.tags + ']';
    } else if (typeof this.tags === 'object' && this.tags != null) {
      this.search = '';
      this.tags.forEach(tag => {
        this.search += '[' + tag + ']';
      });
    }
  }

  /**
   * Search variable to tags
   */
  searchToTags() {
    const searchTags = <string[]>this.search.match(/\[(.*?)\]/g);
    if (searchTags && searchTags.length > 0) {
      this.tags = searchTags.map(tag => tag.slice(1, tag.length - 1));
    }
  }

  /**
   * Creates URL for searching and if same URL fetches the result
   */
  navigateSearch() {
    let queryParams = {};
    if (this.tags && this.tags.length > 0 && this.searchTerm.length > 0) {
      queryParams = { tags: this.tags.join(','), search: this.searchTerm };
    } else if (this.tags && this.tags.length > 0) {
      queryParams = { tags: this.tags.join(',') };
    } else if (this.searchTerm.length > 0) {
      queryParams = { search: this.searchTerm };
    } else {
      queryParams = { tags: null, search: null };
    }
    const newUrl = this.router
      .createUrlTree(['/support-groups'], {
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      })
      .toString();
    if (newUrl === this.router.url) {
      if (this.fetching === false) {
        this.getPosts();
      }
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onTagClick(tag: string) {
    if (this.tags == null) {
      this.tags = [];
    }
    if (!this.tags.find(i => i === tag)) {
      this.tags.push(tag);
      this.page = 1;
      this.morePosts = true;
      this.fetching = true;
      this.posts = [];
      this.tagsToSearch();
      this.navigateSearch();
      this.clearSearch = true;
    }
  }

  /**
   * On Reset Button Press
   * SetTimeout we are introducing delay so that at max the backend doesn't recieve two many requests at once;
   */
  onReset() {
    this.resetParams();
    this.router.navigate(['/support-groups']);
    setTimeout(() => {
      this.getPosts();
    }, 200);
    this.clearSearch = false;
  }

  /**
   * Reset all the params
   */

  onClear() {
    //
  }

  onNewPostClick() {
    this.createPost.emit();
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

  /**
   * Find unique items in the array
   * @param array
   */
  arrayUnique(array: SupportGroupItem[]) {
    const newArray = array.concat();
    for (let i = 0; i < newArray.length; ++i) {
      for (let j = i + 1; j < newArray.length; ++j) {
        if (newArray[i].id === newArray[j].id) {
          newArray.splice(j--, 1);
        }
      }
    }
    return newArray;
  }

  /**
   * Search Result Banner
   */
  getSearchResultMessage() {
    if (this.fetching === false) {
      if (this.search && this.searchTerm && this.posts.length === 0) {
        return (
          'Oops! we could not find any results for <i>' + this.search + '</i>'
        );
      } else if (this.search && this.searchTerm && this.posts.length > 0) {
        return (
          'We found ' +
          this.searchResultCount +
          ' results for <i>' +
          this.searchTerm +
          '</i>'
        );
      }
    }
  }
}
