import { Component, OnInit } from '@angular/core';
import { TagService } from '../shared/tag.service';
import { CreatePostComponent } from './create-post/create-post.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-support-groups',
  templateUrl: './support-groups.component.html',
  styleUrls: ['./support-groups.component.scss']
})
export class SupportGroupsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.tagService.getTags();
  }

  onCreatePostClick() {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '70%',
      data: 'hello',
    });

  }
}
