import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productResolver } from './product.resolver';
import {IProduct} from "../Interfaces/i-product";
import {Observable} from "rxjs";

describe('productResolver', () => {
  const executeResolver: ResolveFn<Observable<IProduct[]>> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => productResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
