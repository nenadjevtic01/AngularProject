import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IProduct} from "../../Interfaces/i-product";
import {IBrand} from "../../Interfaces/i-brand";
import {ICategory} from "../../Interfaces/i-category";
import {IGender} from "../../Interfaces/i-gender";
import {CartService} from "../../Services/cart.service";

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit{
  allProducts:IProduct[]=[];
  product:IProduct[]=[];
  brand:IBrand[]=[];
  productBrand:IBrand[]=[];
  category:ICategory[]=[];
  productCategory:ICategory[]=[];
  randomProducts:IProduct[]=[];
  gender:IGender[]=[];
  productGender:IGender[]=[];
  selectedSize:string="";
  quantity:number=1;
  addToCartDisabled:boolean=true;
  @ViewChild('notAvailable') notAvailable!: TemplateRef<any>;

  constructor(public cartService:CartService, private route: ActivatedRoute) {
  }
  ngOnInit() {
      window.scrollTo({ top: 0});
      this.allProducts = this.route.snapshot.data['data'];
      this.brand=this.route.snapshot.data['brand'];
      this.category=this.route.snapshot.data['category'];
      this.gender=this.route.snapshot.data['gender'];
      this.route.paramMap.subscribe(param=>{
        var productId=param.get('id');
        this.product=this.allProducts.filter(x=>x.id==Number(productId));
        let brandId=this.product[0].brand;
        let categoryId=this.product[0].category;
        let genderId=this.product[0].gender;
        this.getBrandName(brandId);
        this.getCategoryName(categoryId);
        this.getGenderName(genderId);
        this.getRandomProducts();
      })
  }


  getRandomProducts(){
    while(this.randomProducts.length<8){
      const randomIndex=Math.floor(Math.random()*this.allProducts.length);
      const randomProduct : IProduct=this.allProducts.splice(randomIndex,1)[0];
      this.randomProducts.push(randomProduct);
    }
  }

  getBrandName(id:number){
    this.productBrand=this.brand.filter(x=>x.id==id);
  }

  getCategoryName(id:number){
    this.productCategory=this.category.filter(x=>x.id==id);
  }

  getGenderName(id:number){
    this.productGender=this.gender.filter(x=>x.id==id);
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  onSizeChange(){
  //console.log(this.selectedSize);
  }


  checkDisabled(){
    this.addToCartDisabled= !this.selectedSize || this.quantity < 1;
  }
}
