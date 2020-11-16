import { Injectable } from '@angular/core';
import  { createDB, DataBase, DBConfig, Entities, Repository } from '../assets/scripts/DataBase';
import { KeyWord, keyWordSeeds } from '../assets/scripts/KeyWord';
import { PengGen } from '../assets/scripts/PengGen';

class YellowEntities extends Entities {
  KeyWord = {
    entity: KeyWord,
    seeds: keyWordSeeds
  };
  PengGen = PengGen;
}

const entities = {
  KeyWord: {
    entity: KeyWord,
    seeds: keyWordSeeds
  },
  PengGen,
};
export type YellowDB = DataBase<DBConfig<typeof entities>>;

const yellowDBConfig: DBConfig<typeof entities> = {
  name: 'yellow-duck',
  version: 2,
  entities: entities
}

@Injectable({
  providedIn: 'root'
})
export class DbService {
  public getDB: Promise<YellowDB>;
  public keyWordRepository: Repository<typeof entities, 'KeyWord'>;
  constructor() {
    this.getDB = createDB(yellowDBConfig);
    this.getDB.then((db) => {
      this.keyWordRepository = db.getRepository('KeyWord');
      this.keyWordRepository.find((e) => e.word === '函').then((res) => {
        console.log(res);
      });
    });
  }
  // async findAll() {
  //   return (await this.getDB).getRepository('KeyWord').getAll();
  // }
  // async test() {
  //   return (await this.getDB).getRepository('');
  // }
}
