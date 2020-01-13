import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoughtRecordTechniquesComponent } from './thought-record-techniques.component';

describe('ThoughRecordTechniquesComponent', () => {
  let component: ThoughtRecordTechniquesComponent;
  let fixture: ComponentFixture<ThoughtRecordTechniquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThoughtRecordTechniquesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoughtRecordTechniquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
