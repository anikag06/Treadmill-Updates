import { Component, OnInit } from '@angular/core';
import { SupportGroupsService } from '@/main/support-groups/support-groups.service';
import { SuggestedPost } from './suggested-post.model';

@Component({
  selector: 'app-suggested-post',
  templateUrl: './suggested-post.component.html',
  styleUrls: ['./suggested-post.component.scss'],
})
export class SuggestedPostComponent implements OnInit {
  constructor(private sgService: SupportGroupsService) {}

  posts: SuggestedPost[] = [];
  showLoading = true;

  ngOnInit() {
    this.sgService.getSuggestedPosts().subscribe((data: any) => {
      this.posts = data.results;
      console.log('sugg posts', this.posts);
    });
  }
  removeLoading() {
    // setTimeout(() => {
    this.showLoading = false;
    // }, 100);
  }
}
