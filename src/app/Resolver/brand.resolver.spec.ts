import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { brandResolver } from './brand.resolver';
import {Observable} from "rxjs";
import {IBrand} from "../Interfaces/i-brand";

describe('brandResolver', () => {
  const executeResolver: ResolveFn<Observable<IBrand[]>> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => brandResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
