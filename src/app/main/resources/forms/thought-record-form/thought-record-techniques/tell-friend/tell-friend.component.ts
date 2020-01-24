import {Component, Input, OnInit, SimpleChanges, ViewChild,} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import {TellFriendService} from '@/main/resources/forms/thought-record-form/thought-record-techniques/tell-friend/tell-friend.service';

@Component({
  selector: 'app-tell-friend',
  templateUrl: './tell-friend.component.html',
  styleUrls: ['./tell-friend.component.scss'],
})
export class TellFriendComponent implements OnInit {
  techniqueName = 'What would I tell a friend?';
  question =
    'What would I tell a close friend or relative if they were having this thought?';
  submitted = false;
  tell_a_friend = '';
  tellFriendForm = this.formBuilder.group({
    tell_a_friend: new FormControl('', [Validators.required]),
  });
  @Input() thought!: Thought;
  @ViewChild('panel', { static: false }) panel!: any;

  updateTellFriend = false;
  summary = '';

  constructor(
    private formBuilder: FormBuilder,
    private tellFriendService: TellFriendService,
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.thought) {
      this.tellFriendService
        .getTellFriend(this.thought.id)
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.updateTellFriend = true;
            this.tellFriendForm.controls['tell_a_friend'].setValue(
              resp.body.tell_a_friend,
            );
            this.summary = resp.body.tell_a_friend;
          }
        });
    }
  }

  onSubmit() {
    const object = {
      situation_id: this.thought.id,
      tell_a_friend: this.tellFriendForm.value['tell_a_friend'],
    };
    if (this.updateTellFriend) {
      this.tellFriendService
        .putTellFriend(object, this.thought.id)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            console.log('put done');
            this.summary = this.tellFriendForm.value['tell_a_friend'];
            this.panel.expanded = false;
          }
        });
    } else {
      this.tellFriendService.postTellFriend(object).subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          console.log('post done');
          this.summary = this.tellFriendForm.value['tell_a_friend'];
          this.panel.expanded = false;
        }
      });
    }
    // this.summary = this.tellFriendForm.value['tell_a_friend'];
    // console.log(this.tell_a_friend);
  }
}
