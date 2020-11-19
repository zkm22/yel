import { Injectable } from '@angular/core';
import { ModeService } from './mode.service';
import { Subject } from 'rxjs';

export interface Message {
  type: 'recieve' | 'send';
  text: string;
  id: number;
}


//TODO: 添加一个撤回功能
//TODO: 引用功能
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Message[] = [];
  
  public recieveStream: Subject<Message> = new Subject();
  public sendStream: Subject<Message> = new Subject();
  private id = 0;
  // public notification = new window.Notification('aaa');
  constructor(
    private modeService: ModeService,
  ) {
    // window.Notification.requestPermission();
  }
  
  public send(text: string) {
    const message: Message = {
      type: 'send',
      text,
      id: this.id++
    };
    this.sendStream.next(message);
    this.messages.unshift(message);
  }
  public recieve(text: string) {
    const message: Message = {
      type: 'recieve',
      text,
      id: this.id++
    };
    this.recieveStream.next(message);
    this.messages.unshift(message);
  }
}
