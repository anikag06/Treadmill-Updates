import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActAsIfComponent} from './act-as-if.component';

describe('ActAsIfComponent', () => {
    let component: ActAsIfComponent;
    let fixture: ComponentFixture<ActAsIfComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActAsIfComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActAsIfComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
