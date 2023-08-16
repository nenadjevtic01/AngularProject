import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICategory} from "../Interfaces/i-category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  url:string="assets/data/categories.json";
  getCategory():Observable<ICategory[]>{
    return this.http.get<ICategory[]>(this.url);
  }
}
