import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BeliefEvidencesComponent} from './belief-evidences.component';

describe('BeliefEvidencesComponent', () => {
    let component: BeliefEvidencesComponent;
    let fixture: ComponentFixture<BeliefEvidencesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BeliefEvidencesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BeliefEvidencesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
