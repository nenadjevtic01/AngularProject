import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProduct} from "../Interfaces/i-product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http:HttpClient) { }

  url:string="assets/data/products.json";
  getProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.url)
  };

}
