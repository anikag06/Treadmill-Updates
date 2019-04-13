import { Component, OnInit, Inject, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TagService } from '@/main/shared/tag.service';
import { Tag } from '@/main/shared/tag.model';
import { NgForm, FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
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

  @ViewChild('checkboxDiv') checkboxDiv!: ElementRef;

  postForm = this.fb.group({
    title: [''],
    body: [''],
    id: [0],
    tags: this.fb.array([])
  });


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
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Helvetica',
    defaultFontSize: '14',
    fonts: [],
    uploadUrl: '',
  };

  constructor(
    public dialogRef: MatDialogRef<CreatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SupportGroupItem | null,
    private tagService: TagService,
    private sgService: SupportGroupsService,
    private authService: AuthService,
    private sanitizer: SanitizationService,
    private fb: FormBuilder,
  ) { }


  ngOnInit() {
    this.tags = this.tagService.tags;
    this.authService.isLoggedIn()
      .then((data) => {
        if (data) {
          this.user = <User>data;
        }
      });

      if ( this.data ) {
        this.postForm.patchValue({
          title: this.data.title,
          body: this.data.body,
          id: this.data.id,
        });

        this.formTags = this.data.tags.map(tag => tag.id);
      }
      this.buildTags();
  }

  formSubmit() {
    if ( this.postForm.valid ) {
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
      this.errors.push({name: 'Post', value: 'You have not entered anything'});
    }
  }

  createPost(data: any) {
    this.sgService.createPost(data)
      .subscribe(
        (response: any) => {
          const tags = this.tags.filter(item => this.formTags.includes(item.id));
          const sgItem = new SupportGroupItem(response.data.post_id,
                      data.body,
                      data.title,
                      tags,
                      { username: this.user.username, avatar: this.user.avatar },
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
            } else  {
              this.errors.push({name: 'error', value: 'something went wrong'});
            }
          }
        }
      );
  }

  editPost(data: any) {
    this.sgService.editPost(data)
      .subscribe(
        (response: any) => {
          const sgi = <SupportGroupItem>this.data;
          sgi.title = data.title;
          sgi.body = data.body;
          sgi.tags = data.tags.map((i: number) => {
            return this.tags.find(tag => tag.id === i);
          });
          this.sgService.sendUpdated(sgi);
          this.postForm.reset();
          this.dialogRef.close();
        } 
      )
  }

  onCheckboxChange(tagId: number, event: any) {
    if (event.currentTarget.checked) {
      this.formTags.push(tagId);
    } else {
      this.formTags = this.formTags.filter(i => tagId !== i);
    }
    console.log(this.formTags);
  }


  buildTags() {
    if (this.tags) {
      this.tags.forEach(tag => {
        let value = false;
        if (this.data && this.data.tags.find(t => t.id ===  tag.id)) {
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
      return data.body.replace(/&nbsp;/gi, '').slice(0, 50).replace(/(<([^>]+)>)/ig, '');
    }
  }
}
