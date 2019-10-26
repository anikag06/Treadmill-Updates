import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListComponent } from './post-list.component';
import { PostItemComponent } from './post-item/post-item.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@/material.module';
import { TimeAgoPipe } from '@/shared/time-ago.pipe';
import { SafeHtmlPipe } from '../safe-html.pipe';
import { CommentComponent } from './post-item/comment/comment.component';
import { NestedCommentComponent } from './post-item/nested-comment/nested-comment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularEditorModule } from '@xw19/angular-editor';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        AngularEditorModule,
      ],
      declarations: [ PostListComponent,
                      PostItemComponent,
                      TimeAgoPipe,
                      SafeHtmlPipe,
                      CommentComponent,
                      NestedCommentComponent,
                    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
