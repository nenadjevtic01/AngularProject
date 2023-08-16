import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IProduct} from "../../Interfaces/i-product";
import {ICategory} from "../../Interfaces/i-category";
import {CategoryService} from "../../Services/category.service";
import {IFilter} from "../../Interfaces/i-filter";
import {IBrand} from "../../Interfaces/i-brand";
import {BrandService} from "../../Services/brand.service";
import {GenderService} from "../../Services/gender.service";
import {IGender} from "../../Interfaces/i-gender";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  data:IProduct[]=[];
  filteredData:IProduct[]=[];
  // sortedFilteredData:IProduct[]=[];
  // startSortData:IProduct[]=[];
  categoryChecked: string="";
  brandChecked:string="";
  genderChecked:string="";
  categories:ICategory[]=[];
  brands:IBrand[]=[];
  genders:IGender[]=[];
  selectedFilters:IFilter = {
    sizes: [],
    brands: [],
    categories: [],
    genders: [],
    keyword: "",
    sortOption: 0
  };
  productsPerPage: number = 12;
  currentPage: number = 1;
  displayedProducts: IProduct[] = [];
  keyword:string="";
  sortOption:number=0;

    constructor(private route:ActivatedRoute, private http:HttpClient,private categoryService:CategoryService,private brandService:BrandService, public genderService:GenderService) {
    }

  ngOnInit():void {
    window.scrollTo({ top: 0});
    this.data = this.route.snapshot.data['data'];
    this.brands=this.route.snapshot.data['brand'];
    this.categories=this.route.snapshot.data['category'];
    this.genders=this.route.snapshot.data['gender'];
    this.filteredData=this.data;
    this.currentPage=1;

    this.updateDisplayedProducts();

    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      const brand = params['brand'];
      const gender=params['gender'];
      this.genderChecked=gender;
      this.brandChecked=brand;
      this.categoryChecked=category;
      if(category!=null){
        this.selectedFilters.categories=[];
        this.toggleFilter('categories', parseInt(category));
      }
      if(brand!=null){
        this.selectedFilters.brands=[];
        this.toggleFilter('brands', parseInt(brand));
      }
      if(gender!=null){
        this.selectedFilters.genders=[];
        this.toggleFilter('genders',parseInt(gender));
      }
      // this.selectedFilters.categories.push(paramValue);
      // if(paramValue){
      //   this.filteredData=this.filteredData.filter(x=>x.category==paramValue);
      //   this.updateDisplayedProducts();
      // }
    });
  }

  onKeyUp(){
      this.toggleFilter('keyword',this.keyword);
  }
  applySorting() {
      this.toggleFilter('sortOption',this.sortOption);
  }

  toggleFilter(filterType: string, value: any) {

    const selectedFilter = this.selectedFilters[filterType];
    if (Array.isArray(selectedFilter)) {
      const filterIndex = (selectedFilter as string []).indexOf(value);
      if (filterIndex > -1) {
        (selectedFilter as string []).splice(filterIndex, 1);
      } else {
        (selectedFilter as string []).push(value);
      }
      this.filterProducts();
    } else
    {
        this.selectedFilters[filterType] = value;
        this.filterProducts();
    }



    // const filterIndex = (this.selectedFilters[filterType] as string[]).indexOf(value);
    // if (filterIndex > -1) {
    //   this.selectedFilters[filterType].splice(filterIndex, 1);
    // } else {
    //   (this.selectedFilters[filterType] as string[]).push(value);
    // }
    // this.filterProducts();
  }

  filterProducts() {
    this.filteredData=this.data;
    if (this.selectedFilters.sizes.length > 0) {
      this.filteredData = this.filteredData.filter((x) =>
        x.availableSizes!=null ? this.selectedFilters.sizes.some((size) => x.availableSizes.includes(size)) : ""
      );
    }

    if(this.selectedFilters.keyword.length>0){
      //console.log(this.selectedFilters.keyword);
      this.filteredData=this.filteredData.filter((x)=>
        x.name.toLowerCase().includes(this.selectedFilters.keyword.toLowerCase())
      );
    }
    if (this.selectedFilters.brands.length > 0) {
      this.filteredData = this.filteredData.filter((x) =>
        this.selectedFilters.brands.includes(x.brand)
      );
    }

    if (this.selectedFilters.categories.length > 0) {
      this.filteredData = this.filteredData.filter((product) =>
        this.selectedFilters.categories.includes(product.category)
      );
    }
    if (this.selectedFilters.genders.length > 0) {
      this.filteredData = this.filteredData.filter((product) =>
        this.selectedFilters.genders.includes(product.gender)
      );
    }
    if(this.selectedFilters.sortOption!=0){
      switch (Number(this.selectedFilters.sortOption)) {
        case 1: {
          //this.sortedFilteredData = this.sortedFilteredData.sort((a, b) => Number(a.price) - Number(b.price));
          this.filteredData = this.filteredData.sort((a, b) => Number(a.price.newPrice) - Number(b.price.newPrice));
          break;
        }
        case 2: {
          this.filteredData = this.filteredData.sort((a, b) => Number(b.price.newPrice) - Number(a.price.newPrice));
          break;
        }
        case 3: {
          this.filteredData = this.filteredData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        }
        case 4: {
          this.filteredData = this.filteredData.sort((a, b) => b.name.localeCompare(a.name));
          break;
        }
      }
    }
    this.currentPage=1;
    this.updateDisplayedProducts();
  }
  onNextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
    window.scrollTo({ top: 0,behavior: "smooth"});
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
    window.scrollTo({ top: 0,behavior: "smooth"});
  }
  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    this.displayedProducts = this.filteredData.slice(startIndex, endIndex);
  }

  totalPages() {
    return Math.ceil(this.filteredData.length / this.productsPerPage);
  }

  protected readonly parseInt = parseInt;
}
