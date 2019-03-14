import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotAvatarComponent } from './chatbot-avatar.component';

describe('ChatbotAvatarComponent', () => {
  let component: ChatbotAvatarComponent;
  let fixture: ComponentFixture<ChatbotAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
