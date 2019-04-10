import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { SupportGroupsService } from '../support-groups.service';
import { Observable, Subscription } from 'rxjs';
import { SupportGroupItem } from '../support-group-item.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts$!: Observable<SupportGroupItem[]>;
  newPosts: SupportGroupItem[] = [];
  newSgServiceSubscription!: Subscription;

  constructor(
    private sgService: SupportGroupsService
  ) { }

  ngOnInit() {
    this.posts$ = this.sgService.getPosts();
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
    this.newSgServiceSubscription.unsubscribe();
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    console.log(event);
  }
}
