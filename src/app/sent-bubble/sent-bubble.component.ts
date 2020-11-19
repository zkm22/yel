import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sent-bubble',
  templateUrl: './sent-bubble.component.html',
  styleUrls: ['./sent-bubble.component.scss']
})
export class SentBubbleComponent implements OnInit {
  @Input() name: number;

  @ViewChild('ref', {read: ElementRef}) hostRef: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  public focus() {
    (this.hostRef.nativeElement as HTMLElement).scrollIntoView({
      behavior: 'smooth',
    });
  }
}
