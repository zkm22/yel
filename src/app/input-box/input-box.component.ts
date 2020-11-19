import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import {ChatService} from '../chat.service';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
})
export class InputBoxComponent implements OnInit {
  public text = '';
  public fontSize = 16;
  @HostBinding('style.--font-size') get fontSizeStyle() {
    return this.fontSize + 'px';
  };
  @HostBinding('style.--box-height') boxHeight = '22px';
  @ViewChild('textarea')
  private textArea: ElementRef<HTMLTextAreaElement>;
  constructor(
    private chatService: ChatService,
  ) { }

  ngOnInit() {
  }

  setHeight(height?: string) {
    this.textArea.nativeElement.style.height = '5px';
    if (!height) {
      this.textArea.nativeElement.style.height = this.textArea.nativeElement.scrollHeight + 5 + 'px';
    } else {
      this.textArea.nativeElement.style.height = height;
    }
  }

  handleInput() {
    this.setHeight();
  }
  send() {
    if (this.text.length) {
      this.chatService.send(this.text);
      this.text = '';
      this.setHeight('22px');
      this.textArea.nativeElement.focus();
    }
  }

}
