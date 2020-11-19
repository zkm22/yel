import { ChatService } from 'src/app/chat.service';

export class Character {

  public static charName: string;
  public static description?: string;
  public static avatar?: any;

  constructor(
    protected chatService: ChatService,
  ) {}
}
