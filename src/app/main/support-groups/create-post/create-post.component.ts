import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TagService } from '@/main/shared/tag.service';
import { Tag } from '@/main/shared/tag.model';
import { NgForm } from '@angular/forms';
import { SupportGroupsService } from '../support-groups.service';
import { SupportGroupItem } from '../support-group-item.model';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { AngularEditorConfig } from '@xw19/angular-editor';
import { SanitizationService } from '../sanitization.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  tags!: Tag[];
  user!: User;
  formTags: number[] = [];
  errors: any = [];
  body = '';


  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [],
    uploadUrl: '',
  }

  @ViewChild('postCreation') postForm!: NgForm;

  constructor(
    public dialogRef: MatDialogRef<CreatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private tagService: TagService,
    private sgService: SupportGroupsService,
    private authService: AuthService,
    private sanitizer: SanitizationService,
  ) { }


  ngOnInit() {
    this.tags = this.tagService.tags;
    this.authService.isLoggedIn()
      .then((data) => {
        if (data) {
          this.user = <User>data;
        }
      });
  }

  onCheckboxChange(tagId: number, event: any) {
    if (event.currentTarget.checked) {
      this.formTags.push(tagId);
    } else {
      this.formTags = this.formTags.filter(i => tagId !== i);
    }
  }

  formSubmit() {
    if (this.postForm.valid) {
      let title = this.postForm.value['title'].trim();
      title = title.length > 0 ? title : this.getDefaultTitle();
      const data  = { body: this.sanitizer.sanitizeHtml(this.postForm.value['body']), title: title, tags: this.formTags };
      this.sgService.createPost(data)
        .subscribe(
          (resp) => {
            const returnVal = <{status: boolean, message: string, data: { post_id: number}}>resp;
            const tags = this.tags.filter(item => this.formTags.includes(item.id));
            const sgItem = new SupportGroupItem(returnVal.data.post_id,
                                  data.body,
                                  data.title,
                                  tags,
                                  { username: this.user.username },
                                  0,
                                  new Date().toISOString(),
                                  0);
            this.sgService.sendPost(sgItem);
            this.postForm.reset();
            this.dialogRef.close();
          },

          (httpErrorResponse) => {
            this.errors = [];
            const messages = httpErrorResponse.error.message;
            for (const property in messages) {
              if (httpErrorResponse.error.message.hasOwnProperty(property)) {
                 this.errors.push({name: property, value: messages[property]});
              }
            }
          }
        );
    } else {
      this.errors = []
      this.errors.push({name: 'Post', value: 'You cannot create a blank post'});
    }
  }

  submitDisabled() {
    if (this.body) {
      return this.body.replace(/&nbsp;/gi, '').trim().length < 20;
    }
    return false;
  }

  getDefaultTitle() {
    if (this.body) {
      return this.body.trim().replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/gi, '').slice(0, 50);
    }
    return '';
  }

}
