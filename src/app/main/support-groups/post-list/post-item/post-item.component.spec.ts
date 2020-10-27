import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemComponent } from './post-item.component';
import { MaterialModule } from '@/material.module';
import { TimeAgoPipe } from '@/shared/time-ago.pipe';
import { SafeHtmlPipe } from '../../../../shared/safe-html.pipe';
import { CommentComponent } from './comment/comment.component';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@arkaghosh024/angular-editor';
import { NestedCommentComponent } from './nested-comment/nested-comment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SupportGroupItem } from '../../support-group-item.model';
import { AuthService } from '@/shared/auth/auth.service';
import { MockAuth } from '@/shared/auth/mock-auth.service';

describe('PostItemComponent', () => {
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        AngularEditorModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [
        PostItemComponent,
        TimeAgoPipe,
        SafeHtmlPipe,
        CommentComponent,
        NestedCommentComponent,
      ],
      providers: [{ provide: AuthService, useClass: MockAuth }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
    component.supportGroupItem = new SupportGroupItem(
      1,
      'body',
      'title',
      [],
      { username: 'tester', avatar: 'avater' },
      1,
      '',
      1,
      -1,
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
