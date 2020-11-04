import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keywords-setting',
  templateUrl: './keywords-setting.component.html',
  styleUrls: ['./keywords-setting.component.scss']
})
export class KeywordsSettingComponent implements OnInit {
  private db: IDBDatabase;
  constructor() {
    const request = window.indexedDB.open('yellow-duck', 1);
    request.onsuccess = () => {
      this.db = request.result;
    };
    request.onupgradeneeded = () => {
      if (!this.db.objectStoreNames.contains('keywords')) {
        const objectStore = this.db.createObjectStore('keywords', {
          keyPath: 'word',
        });
        objectStore.createIndex('level', 'level');
        objectStore.createIndex('category', 'category');
      }
    }
  }
  addRecord() {
    const request = this.db.transaction('keywords', 'readwrite')
    .objectStore('keywords')
    .add({word: 'test1', level: 1, category: 'test'});
    request.onsuccess = () => {
      alert('success');
    };
  }
  delete() {
    const request = this.db.transaction('keywords', 'readwrite')
    .objectStore('keywords')
    .delete('test1');
    request.onsuccess = () => {
      alert('success');
    };
  }
  find() {
    const request = this.db.transaction('keywords', 'readonly')
    .objectStore('keywords')
    .get('test1');
    request.onsuccess = (e) => {
      console.log(request.result);
    }
  }
  getAll() {
    const request = this.db.transaction('keywords', 'readonly')
    .objectStore('keywords')
    .getAll();
    request.onsuccess = () => {
      console.log(request.result);
    }
  }
  ngOnInit() {
  }

}
