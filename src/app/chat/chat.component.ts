import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { Character } from 'src/assets/scripts/Charactors/Character';
import { ChatService } from '../chat.service';
import { CharacterService } from '../character.service';
import { BubblesService } from '../bubbles.service';
import { SentBubbleComponent } from '../sent-bubble/sent-bubble.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public chars: (typeof Character)[];
  public curChar: Character;
  @ViewChildren('bubble') bubbles;
  constructor(
    public chatService: ChatService,
    public characterService: CharacterService,
    public bubblesService: BubblesService,
  ) {
    this.chars = Object.keys(characterService.chars).map(key => characterService.chars[key]);
    this.curChar = characterService.curChar;
    bubblesService.setFunction(this.getBubbles.bind(this));
  }

  public checkCur(char: typeof Character) {
    return this.curChar instanceof char;
  }
  public getBubbles() {
    return this.bubbles;
  }

  ngOnInit() {
  }

}
