import { Component, OnInit, Input } from '@angular/core';
import { UserNestedComment } from './nested-comment.model';

@Component({
  selector: 'app-nested-comment',
  templateUrl: './nested-comment.component.html',
  styleUrls: ['./nested-comment.component.scss']
})
export class NestedCommentComponent implements OnInit {

  @Input() userNestedComment!: UserNestedComment;

  constructor() { }

  ngOnInit() {
  }

}
