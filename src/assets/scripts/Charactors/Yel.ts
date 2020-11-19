import { ChatService } from 'src/app/chat.service';
import { Character } from './Character';
import avatar from '../../images/default.jpg';

export class Yel extends Character {
  static charName = '是小黄鸭';
  static description = '是小黄呀';
  static avatar = avatar;
  private spiritInterval: number;
  private interval = 600000;
  private writing = false;
  private penggenDict = [
    '嗯嗯',
    '嗯...',
    '然后？',
    '细讲',
    [
      '这个方法好',
      '不过你继续说',
    ]
  ];
  constructor(
    chatService: ChatService
  ) {
    super(chatService);
    chatService.sendStream.subscribe((message) => {
      if (Math.random() > 0.8) {
        this.penggen();
      }
      window.clearTimeout(this.spiritInterval);
      this.resetInterval();
    });
    this.resetInterval();
  }
  private resetInterval = () => {
    window.clearTimeout(this.spiritInterval);
    this.spiritInterval = window.setTimeout(() => {
      const rd = Math.random();
      if (rd > 0.5) {
        this.chatService.recieve('wei,zaima?');
      }
      this.resetInterval();
    }, this.interval);
  }
  
  private penggen() {
    const rd = Math.floor(Math.random() * this.penggenDict.length);
    let sentence = this.penggenDict[rd];
    this.resetInterval();
    if (typeof(sentence) === 'string') {
      window.setTimeout(() => {
        if (typeof(sentence) === 'string') {
          this.chatService.recieve(sentence);
        }
      }, 1000);
      return;
    }
    if (Array.isArray(sentence)) {
      let t = 1000;
      for (let i in sentence) {
        window.setTimeout(() => {
          this.chatService.recieve(sentence[i]);
        }, t * (Number(i) + 1));
      }
    }
  }
}
