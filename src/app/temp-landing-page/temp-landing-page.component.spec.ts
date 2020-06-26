import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempLandingPageComponent } from './temp-landing-page.component';

describe('TempLandingPageComponent', () => {
  let component: TempLandingPageComponent;
  let fixture: ComponentFixture<TempLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
