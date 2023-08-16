import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { categoryResolver } from './category.resolver';
import {Observable} from "rxjs";
import {ICategory} from "../Interfaces/i-category";

describe('categoryResolver', () => {
  const executeResolver: ResolveFn<Observable<ICategory[]>> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => categoryResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
