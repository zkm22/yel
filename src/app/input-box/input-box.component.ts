import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ChatService} from '../chat.service';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
})
export class InputBoxComponent implements OnInit {
  public text = '';
  @ViewChild('textarea')
  private textArea: ElementRef<HTMLTextAreaElement>;
  constructor(
    private chatService: ChatService,
  ) { }

  ngOnInit() {
  }

  send() {
    this.chatService.send(this.text);
    this.text = '';
    this.textArea.nativeElement.focus();
  }

}
