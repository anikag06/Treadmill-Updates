import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BeliefChangeTechniquesComponent} from './belief-change-techniques.component';

describe('BeliefChangeTechniquesComponent', () => {
    let component: BeliefChangeTechniquesComponent;
    let fixture: ComponentFixture<BeliefChangeTechniquesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BeliefChangeTechniquesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BeliefChangeTechniquesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
