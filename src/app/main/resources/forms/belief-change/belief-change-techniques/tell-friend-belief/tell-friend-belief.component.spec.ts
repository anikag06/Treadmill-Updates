import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TellFriendBeliefComponent} from './tell-friend-belief.component';

describe('TellFriendBeliefComponent', () => {
    let component: TellFriendBeliefComponent;
    let fixture: ComponentFixture<TellFriendBeliefComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TellFriendBeliefComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TellFriendBeliefComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
