import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoughtRecordFormComponent } from './thought-record-form.component';

describe('ThoughtRecordFormComponent', () => {
  let component: ThoughtRecordFormComponent;
  let fixture: ComponentFixture<ThoughtRecordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThoughtRecordFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoughtRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
