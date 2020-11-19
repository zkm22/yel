import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recieve-bubble',
  templateUrl: './recieve-bubble.component.html',
  styleUrls: ['./recieve-bubble.component.scss']
})
export class RecieveBubbleComponent implements OnInit {
  @Input() name: number;
  constructor() { }

  ngOnInit() {
  }

}
