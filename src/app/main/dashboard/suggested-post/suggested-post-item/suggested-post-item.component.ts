import { Component, OnInit, Input } from '@angular/core';
import { SuggestedPost } from '../suggested-post.model';

@Component({
  selector: 'app-suggested-post-item',
  templateUrl: './suggested-post-item.component.html',
  styleUrls: ['./suggested-post-item.component.scss']
})
export class SuggestedPostItemComponent implements OnInit {

  constructor() { }
  @Input() suggestedPost!: SuggestedPost;

  ngOnInit() {
  }

}
