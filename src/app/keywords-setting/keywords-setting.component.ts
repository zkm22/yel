import { Component, OnInit } from '@angular/core';
import { KeyWord } from '../../assets/scripts/KeyWord';
import { DbService, YellowDB, YellowEntities } from '../db.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Repository } from 'src/assets/scripts/DataBase';

@Component({
  selector: 'app-keywords-setting',
  templateUrl: './keywords-setting.component.html',
  styleUrls: ['./keywords-setting.component.scss']
})
export class KeywordsSettingComponent implements OnInit {
  private dataBase: YellowDB;
  public allData: KeyWord[] = [];
  private keywordRepo: Repository<YellowEntities, 'KeyWord'>;
  public addForm;
  public count = 0;
  private limit = 10;
  public offset = 0;
  public get pages() {
    const arr = [];
    for (let i = 1, max = Math.ceil(this.count / this.limit); i <= max; ++i) {
      arr.push(i);
    }
    return arr;
  }
  constructor(
    public dbService: DbService,
    public formBuilder: FormBuilder
  ) {
    this.addForm = this.formBuilder.group({
      word: '',
      level: '',
      category: '',
    });
    this.init();
  }
  async init() {
    const db = await this.dbService.getDB.then();
    this.dataBase = db;
    this.keywordRepo = db.getRepository('KeyWord');
    this.getAll();
  }
  async getAll() {
    this.count = await this.keywordRepo.count();
    // this.allData = await this.keywordRepo.getAll();
    this.allData = await this.keywordRepo.find(()=>true, {
      limit: this.limit,
      offset: this.offset,
    });
  }
  changePage(page: number) {
    if (page > 0 && page <= Math.ceil(this.count / this.limit))
    this.offset = page - 1;
    this.getAll();
  }
  async add(e: KeyWord) {
    const res = await this.keywordRepo.add({
      word: e.word,
      level: e.level,
      category: e.category,
    });
    this.getAll();
    return res;
  }
  async remove(key: string) {
    const res = await this.keywordRepo.delete(key);
    this.getAll();
    return res;
  }
  ngOnInit() {
  }
}
