import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { detailsCvResolver } from './details-cv.resolver';

describe('detailsCvResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => detailsCvResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
