/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BubblesService } from './bubbles.service';

describe('Service: Bubbles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BubblesService]
    });
  });

  it('should ...', inject([BubblesService], (service: BubblesService) => {
    expect(service).toBeTruthy();
  }));
});
