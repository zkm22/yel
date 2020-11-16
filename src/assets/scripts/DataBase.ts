import { Entity } from "./Entity";

interface FixedIDBVersionChangeEvent extends IDBVersionChangeEvent {
  target: IDBOpenDBRequest
}

type widthSeeds = {
  entity: (new ()=> Entity),
  seeds: Entity[],
}

function isWidthSeeds(entity): entity is widthSeeds {
  return entity.entity && entity.seeds;
}

// export class DataBase<T extends DBConfig> {
//   public db: IDBDatabase;
//   private entities: Entity[];
//   public ready = false;
//   constructor(
//     private dbConfig: T
//   ) {
    
  // }
  // public async initDataBase() {
  //   const request = window.indexedDB.open(this.dataBase.name, this.dataBase.version);
  //   request.onupgradeneeded = (e: FixedIDBVersionChangeEvent) => {
  //     Object.keys(this.dataBase.entities).forEach(key => {
  //       const item = this.dataBase.entities[key];
  //       if (!isWidthSeeds(item)) {
  //         const entity = new item();
  //         if (!e.target.result.objectStoreNames.contains(item.name)) {
  //           const objectStore = e.target.result.createObjectStore(item.name, {
  //             keyPath: Reflect.getMetadata('keyPath', entity),
  //           });
  //           Reflect.getMetadata('indexes', entity).forEach(index => {
  //             objectStore.createIndex(index, index);
  //           });
  //           }
  //         } else {
  //           const entity = new item.entity();
  //           if (!e.target.result.objectStoreNames.contains(item.entity.name)) {
  //             const objectStore = e.target.result.createObjectStore(item.entity.name, {
  //               keyPath: Reflect.getMetadata('keyPath', entity),
  //             });
  //             Reflect.getMetadata('indexes', entity).forEach(index => {
  //               objectStore.createIndex(index, index);
  //             });
  //             for (let seed of item.seeds) {
  //               objectStore.add(seed);
  //             }
  //           }
  //       }
  //     })
  //   };
  //   return new Promise<IDBDatabase>(resolve => request.onsuccess = (e: FixedIDBVersionChangeEvent) => {
  //     this.ready = true;
  //     resolve(this.db = e.target.result);
  //   });
  // }
//   public getRepository(name: keyof T['entities']) {
    
//   }
// }

export class DataBase<T extends DBConfig> {
  private repositores: {
    [index in keyof T['entities']]?: Repository<
      T['entities'],
      index
    >
  } = {};
  constructor(
    public db: IDBDatabase,
    public name: string,
    public version: number,
  ) {

  }
  public getRepository<U extends keyof T['entities']>(name: U): Repository<T['entities'], U> {
    if (!this.repositores[name]) {
      this.repositores[name] = new Repository<T['entities'], U>(this.db, name)
    }
    return this.repositores[name];
    // return new Repository<T['entities'], typeof name>(this.db, name);
  }
}

export class Repository<T extends Entities, U extends keyof T,
  E = T[U] extends widthSeeds ?
    InstanceType<T[U]['entity']>
    : T[U] extends new () => Entity ?
      InstanceType<T[U]>
      : never
> {
  constructor(
    public db: IDBDatabase,
    public name: U,
  ) {
  }
  getAll(): Promise<E[]> {
    const request = this.db.transaction(this.name as string, 'readonly')
    .objectStore(this.name as string)
    .getAll();
    return new Promise(resolve => {
      request.onsuccess = () => {
        resolve(request.result as any);
      }
    });
  }
  find(
    query: (entity: E) => boolean,
    options?: {
      limit?: number,
      offset?: number,
    },
  ): Promise<E[]> {
    const request = this.db.transaction(this.name as string, 'readonly')
    .objectStore(this.name as string)
    .openCursor();
    const result: E[] = [];
    let {limit = null, offset = 0} = options || {};
    let step = limit * offset;
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const cursor = request.result;
        if (step) {
          cursor.advance(step);
          step = 0;
        }
        if (cursor && limit !== 0) {
          if (query(cursor.value)) {
            result.push(cursor.value);
            if (limit !== null) {
              limit--;
            }
          }
          cursor.continue();
        } else {
          resolve(result);
        }
      }
      request.onerror = (e) => {
        reject(e);
      }
    });
  }
  get(key: string) {
    const request = this.db.transaction(this.name as string, 'readonly')
    .objectStore(this.name as string)
    .get(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(true);
      }
      request.onerror = (e) => {
        reject(e);
      }
    });
  }
  delete(key: string) {
    const request = this.db.transaction(this.name as string, 'readwrite')
    .objectStore(this.name as string)
    .delete(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(true);
      }
      request.onerror = (e) => {
        reject(e);
      }
    });
  }
  add(entity: E) {
    const request = this.db.transaction(this.name as string, 'readwrite')
    .objectStore(this.name as string)
    .add(entity);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(true);
      }
      request.onerror = (e) => {
        reject(e);
      }
    });
  }
  put(entity: E) {
    const request = this.db.transaction(this.name as string, 'readwrite')
    .objectStore(this.name as string)
    .put(entity);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(true);
      }
      request.onerror = (e) => {
        reject(e);
      }
    });
  }
}

export class Entities {
  [index: string]: (new ()=> Entity) | widthSeeds;
}
// export type Entities = Record<string, (new ()=> Entity) | widthSeeds>;

export interface DBConfig<
  T extends Entities = Entities> {
  name: string;
  version?: number;
  entities: T;
}

export function createDB<T extends DBConfig>(dbConfig: T): Promise<DataBase<T>> {
  const request = window.indexedDB.open(dbConfig.name, dbConfig.version);
    request.onupgradeneeded = (e: FixedIDBVersionChangeEvent) => {
      Object.keys(dbConfig.entities).forEach(key => {
        const item = dbConfig.entities[key];
        if (!isWidthSeeds(item)) {
          const entity = new item();
          if (!e.target.result.objectStoreNames.contains(item.name)) {
            const objectStore = e.target.result.createObjectStore(item.name, {
              keyPath: Reflect.getMetadata('keyPath', entity),
            });
            Reflect.getMetadata('indexes', entity).forEach(index => {
              objectStore.createIndex(index, index);
            });
            }
          } else {
            const entity = new item.entity();
            if (!e.target.result.objectStoreNames.contains(item.entity.name)) {
              const objectStore = e.target.result.createObjectStore(item.entity.name, {
                keyPath: Reflect.getMetadata('keyPath', entity),
              });
              Reflect.getMetadata('indexes', entity).forEach(index => {
                objectStore.createIndex(index, index);
              });
              for (let seed of item.seeds) {
                objectStore.add(seed);
              }
            }
        }
      })
    };
    return new Promise(resolve => request.onsuccess = (e: FixedIDBVersionChangeEvent) => {
      const dataBase = new DataBase<T>(e.target.result, dbConfig.name, dbConfig.version);
      resolve(dataBase);
    });
}
