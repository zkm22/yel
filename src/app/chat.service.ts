import { Injectable } from '@angular/core';
import { ModeService } from './mode.service';

interface Message {
  type: 'recieve' | 'send';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Message[] = [];
  private spiritInterval: number;
  private interval = 600000;
  private writing = false;
  private penggenDict = [
    '嗯嗯',
    '嗯...',
    '然后？',
    [
      '这个方法好',
      '不过你继续说',
    ]
  ];

  constructor(
    private modeService: ModeService,
  ) {
    this.resetInterval();
  }
  private resetInterval() {
    window.clearTimeout(this.spiritInterval);
    if (this.modeService.mode === 'interactive') {
      this.spiritInterval = window.setTimeout(() => {
        const rd = Math.random();
        if (rd > 0.5) {
          this.recieve('wei,zaima?');
        }
        this.resetInterval();
      }, this.interval);
    }
  }
  private penggen() {
    const rd = Math.floor(Math.random() * this.penggenDict.length);
    let sentence = this.penggenDict[rd];
    this.resetInterval();
    if (typeof(sentence) === 'string') {
      window.setTimeout(() => {
        if (typeof(sentence) === 'string') {
          this.recieve(sentence);
        }
      }, 1000);
      return;
    }
    if (Array.isArray(sentence)) {
      let t = 1000;
      for (let i in sentence) {
        window.setTimeout(() => {
          this.recieve(sentence[i]);
        }, t * (Number(i) + 1));
      }
    }
  }
  public send(text: string) {
    this.messages.unshift(
      {
        type: 'send',
        text,
      }
    );
    if (Math.random() > 0.8) {
      this.penggen();
    }
    window.clearTimeout(this.spiritInterval);
    this.resetInterval();
  }
  public recieve(text: string) {
    this.messages.unshift(
      {
        type: 'recieve',
        text,
      }
    );
  }
}
