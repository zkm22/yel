import { Component, OnInit } from '@angular/core';
import { KeyWord } from '../../assets/scripts/KeyWord';
import { DbService, YellowDB } from '../db.service';

interface FixedIDBVersionChangeEvent extends IDBVersionChangeEvent {
  target: IDBOpenDBRequest
}

@Component({
  selector: 'app-keywords-setting',
  templateUrl: './keywords-setting.component.html',
  styleUrls: ['./keywords-setting.component.scss']
})
export class KeywordsSettingComponent implements OnInit {
  private dataBase: YellowDB;
  public allData: KeyWord[] = [];
  constructor(
    public dbService: DbService
  ) {
    dbService.getDB.then(async (db) => {
      this.dataBase = db;
      this.allData = await this.getAll();
    });
  }
  async getAll() {
    return await this.dataBase.getRepository('KeyWord').getAll();
  }
  ngOnInit() {
  }
}
