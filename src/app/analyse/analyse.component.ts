import { Component, OnInit, QueryList } from '@angular/core';
import { KeyWord } from 'src/assets/scripts/KeyWord';
import { AnalyseService, Result } from '../analyse.service';
import { BubblesService } from '../bubbles.service';
import { SentBubbleComponent } from '../sent-bubble/sent-bubble.component';

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss']
})
export class AnalyseComponent implements OnInit {

  public result: Result = [];
  public bubbles;

  constructor(
    private analyseService: AnalyseService,
    private bubblesService: BubblesService,
  ) {
    this.result = analyseService.result;
  }
  async handleMessageClick(id: number) {
    ((await this.bubblesService.getBubbles()) as QueryList<SentBubbleComponent>).find(bub=>bub.name===id).focus();
  }
  ngOnInit() {
  }

}
