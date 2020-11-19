import { Injectable } from '@angular/core';
import { Repository } from 'src/assets/scripts/DataBase';
import { KeyWord } from 'src/assets/scripts/KeyWord';
import { ChatService, Message } from './chat.service';
import { DbService, YellowEntities } from './db.service';

export type Result = Array<{
  message: Message;
  keywords: KeyWord[];
}>;

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {

  // private keywordsRepo: Repository<YellowEntities, 'KeyWord'>;
  private keywords: KeyWord[];
  public result: Result = [];

  constructor(
    private chatService: ChatService,
    private dbService: DbService,
  ) {
    // chatService.messages;
    chatService.sendStream.subscribe((message) => {
      this.findWord(message);
    });
    dbService.getDB.then(async (yellowDb) => {
      this.keywords = (await yellowDb.getRepository('KeyWord').getAll()).sort();
    });
  }
  private findWord(message: Message) {
    const res: KeyWord[] = [];
    this.keywords.forEach((keyword) => {
      if (message.text.indexOf(keyword.word) > -1) {
        res.push(keyword);
      }
    });
    this.result.push({
      message,
      keywords: res,
    });
  }
}
