import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGender} from "../Interfaces/i-gender";

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private http:HttpClient) { }

  private url:string="assets/data/gender.json";

  getGender():Observable<IGender[]>{
     return this.http.get<IGender[]>(this.url);
  }
}
