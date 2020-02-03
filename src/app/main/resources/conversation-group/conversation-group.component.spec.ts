import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationGroupComponent } from './conversation-group.component';

describe('ConversationGroupComponent', () => {
  let component: ConversationGroupComponent;
  let fixture: ComponentFixture<ConversationGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConversationGroupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
