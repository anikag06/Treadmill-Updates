import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  AfterContentInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TagService } from '@/main/shared/tag.service';
import { Tag } from '@/main/shared/tag.model';
import {
  NgForm,
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { SupportGroupsService } from '../support-groups.service';
import { SupportGroupItem } from '../support-group-item.model';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { AngularEditorConfig } from '@arkaghosh024/angular-editor';
import { SanitizationService } from '../../shared/sanitization.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TagGroup } from '@/main/shared/tag-group.model';
import {
  COMMON_EDITOR_CONFIG,
  SUPPORT_GROUP_POST_SCORE,
} from '@/app.constants';
import { CommonService } from '@/shared/common.service';
import { UserProfileService } from '@/main/shared/user-profile/user-profile.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  tagsGroup!: TagGroup[];
  tags!: Tag[];
  user!: User;
  formTags: number[] = [];
  errors: any = [];
  crossIcon = '../../assets/support-group/close_sg.svg';

  @ViewChild('checkboxDiv', { static: false }) checkboxDiv!: ElementRef;

  postForm = this.fb.group({
    title: [''],
    body: [''],
    id: [0],
    tags: this.fb.array([]),
  });

  editorConfig: AngularEditorConfig = {
    ...COMMON_EDITOR_CONFIG,
    placeholder: 'Enter your post here',
    showToolbar: true,
    height: '15rem',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
  };

  constructor(
    public dialogRef: MatDialogRef<CreatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SupportGroupItem | null,
    private tagService: TagService,
    private sgService: SupportGroupsService,
    private authService: AuthService,
    private sanitizer: SanitizationService,
    private fb: FormBuilder,
    private overlayContainer: OverlayContainer,
    private elem: ElementRef,
    private commonService: CommonService,
    private userProfileService: UserProfileService,
  ) {
    overlayContainer.getContainerElement().classList.add('custom-overlay');
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.tagsGroup = this.tagService.tagsGroup;
    this.tags = this.tagService.tags;
    this.user = <User>this.authService.isLoggedIn();
    if (this.data) {
      this.postForm.patchValue({
        title: this.data.title,
        body: this.data.body,
        id: this.data.id,
      });

      this.formTags = this.data.tags.map(tag => tag.id);
    }
    console.log('tags data', this.tagsGroup);
    this.buildTags();
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    const angEditor = this.elem.nativeElement.querySelectorAll(
      '.angular-editor',
    );
    angEditor[0].setAttribute('style', ' background-color:white !important;');
  }

  formSubmit() {
    if (this.postForm.valid) {
      const formData = this.postForm.value;
      formData.tags = this.formTags;
      formData.body = this.sanitizer.sanitizeHtml(formData.body);
      formData.title = this.getTitle(formData);
      if (this.data) {
        this.editPost(formData);
      } else {
        delete formData.id;
        this.createPost(formData);
      }
    } else {
      this.errors.push({
        name: 'Post',
        value: 'You have not entered anything',
      });
    }
  }

  createPost(data: any) {
    this.sgService.createPost(data).subscribe(
      (response: any) => {
        this.commonService.updateScore(SUPPORT_GROUP_POST_SCORE);
        const tags = this.tags.filter(item => this.formTags.includes(item.id));
        const sgItem = new SupportGroupItem(
          response.data.post_id,
          data.body,
          data.title,
          tags,
          { username: this.user.username },
          0,
          new Date().toISOString(),
          0,
          0,
        );
        const updatedsgItem = new SupportGroupItem(
          sgItem.id,
          sgItem.body,
          sgItem.title,
          sgItem.tags,
          {
            username: sgItem.user.username,
            avatar: this.sgService.userProfileData.user_avatar,
            score: this.sgService.userProfileData.score,
            no_of_gold_badges: this.sgService.userProfileData.no_of_gold_badges,
            no_of_bronze_badges: this.sgService.userProfileData
              .no_of_bronze_badges,
            no_of_silver_badges: this.sgService.userProfileData
              .no_of_silver_badges,
          },
          sgItem.up_votes,
          sgItem.created_at,
          sgItem.comments_count,
          sgItem.is_voted,
          sgItem.is_thanked,
        );
        this.sgService.sendPost(updatedsgItem);
        this.postForm.reset();
        this.dialogRef.close();
      },

      httpErrorResponse => {
        this.errors = [];
        const messages = httpErrorResponse.error.message;
        for (const property in messages) {
          if (httpErrorResponse.error.message.hasOwnProperty(property)) {
            this.errors.push({ name: property, value: messages[property] });
          } else {
            this.errors.push({ name: 'error', value: 'something went wrong' });
          }
        }
      },
    );
  }

  editPost(data: any) {
    this.sgService.editPost(data).subscribe((response: any) => {
      const sgi = <SupportGroupItem>this.data;
      sgi.title = data.title;
      sgi.body = data.body;
      sgi.tags = data.tags.map((i: number) => {
        return this.tags.find(tag => tag.id === i);
      });
      this.sgService.sendUpdated(sgi);
      this.postForm.reset();
      this.dialogRef.close();
    });
  }

  onTagButtonClick(tagId: number, event: any) {
    console.log('tag clicked', event, tagId);
    if (event) {
      if (this.formTags.includes(tagId)) {
        if (event.target.nodeName === 'BUTTON') {
          console.log('Button');
          event.target.classList.remove('toggleButton');
          event.target.children[0].children[0].classList.add('d-none');
        } else if (event.target.nodeName === 'SPAN') {
          console.log('Span');
          event.target.parentElement.classList.remove('toggleButton');
          event.target.children[0].classList.add('d-none');
        } else {
          event.target.parentElement.offsetParent.classList.remove(
            'toggleButton',
          );
          event.target.classList.add('d-none');
        }
        console.log(' event.target.innerHTML', event);
        this.formTags = this.formTags.filter(i => tagId !== i);
      } else {
        this.formTags.push(tagId);
        if (event.target.nodeName === 'BUTTON') {
          console.log('Button');
          event.target.classList.add('toggleButton');
          event.target.children[0].children[0].classList.remove('d-none');
        } else if (event.target.nodeName === 'SPAN') {
          console.log('Span');
          event.target.parentElement.classList.add('toggleButton');
          event.target.children[0].classList.remove('d-none');
        }

        console.log('event', event);
        // event.target.children[0].classList.remove('d-none');
      }
    }
  }

  buildTags() {
    if (this.tags) {
      this.tags.forEach(tag => {
        let value = false;
        if (this.data && this.data.tags.find(t => t.id === tag.id)) {
          value = true;
        }
        (this.postForm.controls.tags as FormArray).push(new FormControl(value));
      });
    }
  }

  getTitle(data: any) {
    if (data.title && data.title.trim().length > 0) {
      return data.title.trim();
    } else {
      return this.sanitizer
        .stripTags(data.body.replace(/&nbsp;/gi, ''))
        .split(/\s+/)
        .splice(0, 7)
        .join(' ');
    }
  }

  onClose() {
    if (confirm('Are you sure to close you will lost unsaved post ?')) {
      this.dialogRef.close();
    }
  }

  getFormTags() {
    return (<FormArray>this.postForm.get('tags')).controls;
  }
  // getFormTagsGroup() {
  //   return (<FormArray>this.postForm.get('tagsGroup')).controls;
  // }
}
