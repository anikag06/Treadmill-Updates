import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotAvatarComponent } from './chatbot-avatar.component';
import { User } from '@/shared/user.model';

describe('ChatbotAvatarComponent', () => {
  let component: ChatbotAvatarComponent;
  let fixture: ComponentFixture<ChatbotAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatbotAvatarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotAvatarComponent);
    component = fixture.componentInstance;
    component.user = new User(1, 'tester', 'test@test.com', '', true, true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show username', () => {
    expect(
      fixture.nativeElement.querySelector('div.chatbot-text').innerText,
    ).toEqual(
      'Hello ' +
        component.user.username +
        '! Do you have any Questions? Click on me and we can chat.',
    );
  });
});
