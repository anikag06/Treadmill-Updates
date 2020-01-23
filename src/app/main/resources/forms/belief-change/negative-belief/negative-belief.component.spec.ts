import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NegativeBeliefComponent} from './negative-belief.component';

describe('NegativeBeliefComponent', () => {
    let component: NegativeBeliefComponent;
    let fixture: ComponentFixture<NegativeBeliefComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NegativeBeliefComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NegativeBeliefComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
