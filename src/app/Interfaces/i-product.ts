import {IImage} from "./i-category";

export interface IProduct {
  id:number,
  name:string,
  img:IImage
  category:number,
  brand:number,
  gender:number,
  sale:boolean,
  price:IPrice,
  inStock:boolean,
  availableSizes:string[],
  specs:ISpecification
}

export interface IPrice{
  newPrice:number,
  oldPrice:number|null
}

export interface ISpecification{
  material:string,
  COO:string
}
