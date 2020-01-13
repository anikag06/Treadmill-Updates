import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoughtHelpComponent } from './thought-help.component';

describe('ThoughtHelpComponent', () => {
  let component: ThoughtHelpComponent;
  let fixture: ComponentFixture<ThoughtHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThoughtHelpComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoughtHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
