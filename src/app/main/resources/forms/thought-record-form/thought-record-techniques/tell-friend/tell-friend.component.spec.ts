import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TellFriendComponent } from './tell-friend.component';

describe('TellFriendComponent', () => {
  let component: TellFriendComponent;
  let fixture: ComponentFixture<TellFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TellFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TellFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
