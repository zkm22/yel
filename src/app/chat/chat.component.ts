import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public avatars = ['yellow', 'blue', 'green'];
  constructor(
    public chatService: ChatService,
  ) { }

  ngOnInit() {
    console.log(this.chatService)
  }

}
