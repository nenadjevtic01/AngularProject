import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {INav} from "../Interfaces/i-nav";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private http: HttpClient) { }

  url: string ="assets/data/navigation.json";

  getNav():Observable<INav[]>{
    return this.http.get<INav[]>(this.url);
  }
}
