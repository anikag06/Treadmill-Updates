import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendlyFaceGameComponent } from './friendly-face-game.component';

describe('FriendlyFaceGameComponent', () => {
  let component: FriendlyFaceGameComponent;
  let fixture: ComponentFixture<FriendlyFaceGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendlyFaceGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendlyFaceGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
