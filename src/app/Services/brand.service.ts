import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBrand} from "../Interfaces/i-brand";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient) { }

  url:string="assets/data/brands.json"

  getBrands():Observable<IBrand[]>{
      return this.http.get<IBrand[]>(this.url);
}
}
