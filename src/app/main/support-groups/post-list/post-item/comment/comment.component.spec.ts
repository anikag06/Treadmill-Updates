import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@xw19/angular-editor';
import { SafeHtmlPipe } from '@/main/support-groups/safe-html.pipe';
import { TimeAgoPipe } from '@/shared/time-ago.pipe';
import { NestedCommentComponent } from '../nested-comment/nested-comment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialModule } from '@/material.module';
import { UserComment } from './user-comment.model';
import { User } from '@/shared/user.model';
import { MockAuth } from '@/shared/auth/mock-auth.service';
import { AuthService } from '@/shared/auth/auth.service';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AngularEditorModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
      ],
      declarations: [
        CommentComponent,
        SafeHtmlPipe,
        TimeAgoPipe,
        NestedCommentComponent,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: AuthService, useClass: MockAuth },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = new UserComment(
      1,
      { username: 'test', avatar: '' },
      'this is a comment',
      1,
      1,
      '',
      -1,
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
