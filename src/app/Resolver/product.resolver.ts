import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {ProductsService} from "../Services/products.service";
import {IProduct} from "../Interfaces/i-product";
import {Observable} from "rxjs";

export const productResolver: ResolveFn<Observable<IProduct[]>> = (route, state) => {
  return inject(ProductsService).getProducts();
};
