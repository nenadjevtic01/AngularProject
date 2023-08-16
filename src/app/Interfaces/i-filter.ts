export interface IFilter {
  sizes: string[];
  brands: number[];
  categories: number[];
  genders: number[];
  keyword:string;
  sortOption:number;
  [key: string]: string[] | number[] | string | number;
}
