import { Component, Input, OnInit } from '@angular/core';
import { Repository } from 'src/assets/scripts/DataBase';
import { KeyWord } from '../../assets/scripts/KeyWord';
import { DbService, YellowEntities } from '../db.service';

@Component({
  selector: 'app-keywords-table',
  templateUrl: './keywords-table.component.html',
  styleUrls: ['./keywords-table.component.scss']
})
export class KeywordsTableComponent implements OnInit {
  
  @Input() tableData: KeyWord[];
  @Input() remove: (key: string) => Promise<any>;

  constructor(
    public dbService: DbService,
  ) {
  }
  ngOnInit() {
  }

}
