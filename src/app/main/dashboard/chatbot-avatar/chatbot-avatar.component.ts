import { Component, OnInit, Input } from '@angular/core';
import { User } from '@/shared/user.model';

@Component({
  selector: 'app-chatbot-avatar',
  templateUrl: './chatbot-avatar.component.html',
  styleUrls: ['./chatbot-avatar.component.scss']
})
export class ChatbotAvatarComponent implements OnInit {

  @Input() user!: User;

  constructor() { }

  ngOnInit() {
  }

}
