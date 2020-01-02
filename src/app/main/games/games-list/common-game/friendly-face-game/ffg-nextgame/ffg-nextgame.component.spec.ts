import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfgNextgameComponent } from './ffg-nextgame.component';

describe('FfgNextgameComponent', () => {
  let component: FfgNextgameComponent;
  let fixture: ComponentFixture<FfgNextgameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FfgNextgameComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfgNextgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
