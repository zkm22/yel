import { Injectable } from '@angular/core';
import { Character } from 'src/assets/scripts/Charactors/Character';
import { Yel } from '../assets/scripts/Charactors/Yel';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  public curChar: Character;
  private charMap = new Map<typeof Character, Character>();
  public chars = {
    Yel,
  };

  constructor(
    private chatService: ChatService,
  ) {
    this.curChar = this.getChar(Yel);
  }

  getChar(
    char: typeof Character,
  ) {
    const created = this.charMap.get(char);
    if (created) {
      return created;
    }
    return new char(this.chatService);
  }

}
