import { Component, OnInit } from '@angular/core';
import { TagService } from '../shared/tag.service';
import { CreatePostComponent } from './create-post/create-post.component';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { TREADWILL } from '@/app.constants';

@Component({
  selector: 'app-support-groups',
  templateUrl: './support-groups.component.html',
  styleUrls: ['./support-groups.component.scss']
})
export class SupportGroupsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private tagService: TagService,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Support Group | ' + TREADWILL);
  }

  ngOnInit() {
    this.tagService.getTags();
  }

  onCreatePostClick() {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '90%',
      data: null,
    });

  }
}
