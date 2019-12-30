import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpfDealWithWorryComponent } from './wpf-deal-with-worry.component';

describe('WpfDealWithWorryComponent', () => {
  let component: WpfDealWithWorryComponent;
  let fixture: ComponentFixture<WpfDealWithWorryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WpfDealWithWorryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpfDealWithWorryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
