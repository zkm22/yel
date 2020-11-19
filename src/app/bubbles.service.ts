import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BubblesService {
  public getBubbles;
  constructor() {
    this.getBubbles = new Promise(resolve => {
      this.setFunction = (fun: () => any) => {
        this.getBubbles = fun;
        resolve();
      }
    });
  }
  public setFunction;

}
