import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfgPlayagainComponent } from './ffg-playagain.component';

describe('FfgPlayagainComponent', () => {
  let component: FfgPlayagainComponent;
  let fixture: ComponentFixture<FfgPlayagainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FfgPlayagainComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfgPlayagainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
