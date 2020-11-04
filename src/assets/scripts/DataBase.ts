export class DataBase {
  private db: IDBDatabase;
  constructor(
    public name: string,
    public version: number = 1,
  ) {
    const request = window.indexedDB.open(name, version);
    request.onsuccess = () => {
      this.db = request.result;
    };
  }
}
