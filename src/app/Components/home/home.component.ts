import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../Interfaces/i-product";
import {ActivatedRoute} from "@angular/router";
import {IBrand} from "../../Interfaces/i-brand";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  brands:IBrand[]=[];
  data:IProduct[]=[];
  productsOnSale:IProduct[]=[];
  randomProducts:IProduct[]=[];
  constructor(private route:ActivatedRoute) {}

  ngOnInit():void {
    window.scrollTo({ top: 0});
    this.data = this.route.snapshot.data['data'];
    this.brands=this.route.snapshot.data['brand'];
    this.productsOnSale=this.data.filter(x=>x.sale).slice(0,8);
    this.getRandomProducts();
  }

  getRandomProducts(){
    while(this.randomProducts.length<8){
      const randomIndex=Math.floor(Math.random()*this.data.length);
      const randomProduct : IProduct=this.data.splice(randomIndex,1)[0];
      this.randomProducts.push(randomProduct);
    }
  }
}
