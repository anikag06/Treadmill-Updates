import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedCommentComponent } from './nested-comment.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TimeAgoPipe } from '@/shared/time-ago.pipe';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialModule } from '@/material.module';
import { UserNestedComment } from './nested-comment.model';
import { User } from '@/shared/user.model';
import { MockAuth } from '@/shared/auth/mock-auth.service';
import { AuthService } from '@/shared/auth/auth.service';

describe('NestedCommentComponent', () => {
  let component: NestedCommentComponent;
  let fixture: ComponentFixture<NestedCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule, RouterTestingModule, MaterialModule],
      declarations: [ TimeAgoPipe, NestedCommentComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: AuthService, useClass: MockAuth}
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedCommentComponent);
    component = fixture.componentInstance;
    component.user = new User(1, 'test', 'test@test.com', '', false, false);
    component.userNestedComment = new UserNestedComment(1, 'nested component', 1, { username: 'teste', avatar: 'ets'}, 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
