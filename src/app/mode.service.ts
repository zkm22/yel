import { Injectable } from '@angular/core';

type Mode = 'interactive' | 'order';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  public mode: Mode = 'interactive';
  constructor() { }

  public setMode(mode: Mode) {
    this.mode = mode;
  }

}
