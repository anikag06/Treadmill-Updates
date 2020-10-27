import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportGroupsComponent } from './support-groups.component';
import { PostListComponent } from './post-list/post-list.component';
import { CommentComponent } from './post-list/post-item/comment/comment.component';
import { NestedCommentComponent } from './post-list/post-item/nested-comment/nested-comment.component';
import { FormsModule } from '@angular/forms';
import { PostItemComponent } from './post-list/post-item/post-item.component';
import { MaterialModule } from '@/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TimeAgoPipe } from '@/shared/time-ago.pipe';
import { SafeHtmlPipe } from '../../shared/safe-html.pipe';
import {
  AngularEditorComponent,
  AngularEditorModule,
} from '@arkaghosh024/angular-editor';
import { RouterTestingModule } from '@angular/router/testing';

describe('SupportGroupsComponent', () => {
  let component: SupportGroupsComponent;
  let fixture: ComponentFixture<SupportGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MaterialModule,
        HttpClientTestingModule,
        AngularEditorModule,
        RouterTestingModule,
      ],
      declarations: [
        SupportGroupsComponent,
        PostListComponent,
        PostItemComponent,
        CommentComponent,
        NestedCommentComponent,
        TimeAgoPipe,
        SafeHtmlPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
