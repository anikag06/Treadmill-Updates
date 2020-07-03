import {Component, HostListener, Inject, OnInit, Optional} from '@angular/core';
import { TagGroup } from '@/main/shared/tag-group.model';
import { TagService } from '@/main/shared/tag.service';
import { Tag } from '@/main/shared/tag.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupportGroupsService } from '@/main/support-groups/support-groups.service';
import { IntroService } from '@/main/walk-through/intro.service';

@Component({
  selector: 'app-intro-select-tags',
  templateUrl: './intro-select-tags.component.html',
  styleUrls: ['./intro-select-tags.component.scss'],
})
export class IntroSelectTagsComponent implements OnInit {
  tagsGroup!: TagGroup[];
  tags!: Tag[];
  formTags: number[] = [];
  fromFlow!: boolean;
  loading = false;
  showScrollNote = true;
  constructor(
    private tagService: TagService,
    private dialogRef: MatDialogRef<IntroSelectTagsComponent>,
    private sgService: SupportGroupsService,
    private introService: IntroService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.tagsGroup = this.tagService.tagsGroup;
    this.tags = this.tagService.tags;
    if (this.data) {
      this.fromFlow = this.fromFlow;
    }
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
  //
  scrollFrame(value: string) {

    if (value === 'down') {
    this.showScrollNote = false;
    }
    if(value ==='top'){
      this.showScrollNote = true;
    }
  }



  onTagsSubmit() {
    this.dialogRef.close();
    this.introService.setLoadingTrue();
    this.sgService.personalizePost(this.formTags).subscribe(
      res => {
        this.introService.setLoadingFalse();
        if (this.fromFlow) {
          setTimeout(() => {
            this.introService.startSupportGroupIntro();
          }, 1000);
        }
      },
      error => {},
    );
  }

}
