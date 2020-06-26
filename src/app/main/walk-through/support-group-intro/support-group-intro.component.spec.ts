import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportGroupIntroComponent } from './support-group-intro.component';

describe('SupportGroupIntroComponent', () => {
  let component: SupportGroupIntroComponent;
  let fixture: ComponentFixture<SupportGroupIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupportGroupIntroComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportGroupIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
