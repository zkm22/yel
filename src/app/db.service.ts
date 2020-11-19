import { Injectable } from '@angular/core';
import { createDB, DataBase, DBConfig, Entities, Repository } from '../assets/scripts/DataBase';
import { KeyWord, keyWordSeeds } from '../assets/scripts/KeyWord';
import { PengGen } from '../assets/scripts/PengGen';

const entities = {
  KeyWord: {
    entity: KeyWord,
    seeds: keyWordSeeds
  },
  PengGen,
};
export type YellowEntities = typeof entities;
export type YellowDB = DataBase<DBConfig<YellowEntities>>;

const yellowDBConfig: DBConfig<YellowEntities> = {
  name: 'yellow-duck',
  version: 2,
  entities: entities
}

@Injectable({
  providedIn: 'root'
})
export class DbService {
  public getDB: Promise<YellowDB>;
  public keyWordRepository: Promise<Repository<YellowEntities, 'KeyWord'>>;
  constructor() {
    this.getDB = createDB(yellowDBConfig);
    this.keyWordRepository = new Promise(resolve => {
      this.getDB.then((db) => {
        resolve(db.getRepository('KeyWord'));
      });
    });
  }
}
