import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Belief} from '@/main/resources/forms/belief-change/belief.model';
import {TellFriendBeliefService} from './tell-friend-belief.service';

@Component({
    selector: 'app-tell-friend-belief',
    templateUrl: './tell-friend-belief.component.html',
    styleUrls: ['./tell-friend-belief.component.scss'],
})
export class TellFriendBeliefComponent implements OnInit {
    techniqueName = 'What would I tell a friend?';
    question =
        'What would I tell a close friend or relative if they were having this belief?';
    submitted = false;
    tell_a_friend = '';
    tellFriendForm = this.formBuilder.group({
        tell_a_friend: new FormControl('', [Validators.required]),
    });
    @Input() belief!: Belief;
    @ViewChild('panel', {static: false}) panel!: any;

    updateTellFriend = false;
    summary = '';

    constructor(
        private formBuilder: FormBuilder,
        private tellFriendService: TellFriendBeliefService,
    ) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.belief) {
            this.tellFriendService
                .getTellFriendBelief(this.belief.id)
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
            belief_id: this.belief.id,
            tell_a_friend: this.tellFriendForm.value['tell_a_friend'],
        };
        if (this.updateTellFriend) {
            this.tellFriendService
                .putTellFriendBelief(object, this.belief.id)
                .subscribe((resp: any) => {
                    const status = resp.ok;
                    if (status) {
                        console.log('put done');
                        this.summary = this.tellFriendForm.value['tell_a_friend'];
                        this.panel.expanded = false;
                    }
                });
        } else {
            this.tellFriendService
                .postTellFriendBelief(object)
                .subscribe((resp: any) => {
                    const status = resp.ok;
                    if (status) {
                        console.log('post done');
                        this.summary = this.tellFriendForm.value['tell_a_friend'];
                        this.panel.expanded = false;
                    }
                });
        }
    }
}
