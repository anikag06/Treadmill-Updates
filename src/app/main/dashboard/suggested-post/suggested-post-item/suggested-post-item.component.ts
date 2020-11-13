import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SuggestedPost } from '../suggested-post.model';
import { SupportGroupsService } from '@/main/support-groups/support-groups.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suggested-post-item',
  templateUrl: './suggested-post-item.component.html',
  styleUrls: ['./suggested-post-item.component.scss'],
})
export class SuggestedPostItemComponent implements OnInit {
  constructor(
    private sgService: SupportGroupsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  @Input() suggestedPost!: SuggestedPost;
  @Output() removeLoading = new EventEmitter();
  id!: number;
  bodyLength = 60;
  showLoading = true;

  ngOnInit() {}
  ngAfterViewInit(): void {}

  onPostClick(id: number) {
    // console.log(id);
    this.id = id;
    this.navigateSearch();
  }

  /**
   * Creates URL for searching with id
   */

  navigateSearch() {
    console.log(this.id);
    let queryParams = {};
    if (this.id) {
      queryParams = { id: this.id };
      this.router.navigate(['/main/support-groups'], {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      });
    }
  }
  imageLoaded() {
    this.removeLoading.emit();
    setTimeout(() => {
      this.showLoading = false;
    }, 100);
  }
}
