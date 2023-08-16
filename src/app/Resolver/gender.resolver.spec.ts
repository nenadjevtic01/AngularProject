import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { genderResolver } from './gender.resolver';
import {Observable} from "rxjs";
import {IGender} from "../Interfaces/i-gender";

describe('genderResolver', () => {
  const executeResolver: ResolveFn<Observable<IGender[]>> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => genderResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
