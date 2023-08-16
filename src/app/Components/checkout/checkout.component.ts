import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../Interfaces/i-product";
import {ICart} from "../../Interfaces/i-cart";
import {CartService} from "../../Services/cart.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  cart:ICart[]=[];
  products:IProduct[]=[];
  cartProducts:IProduct[]=[];
  cartTotal:number=0;

  constructor(private cartService:CartService,private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.products=this.route.snapshot.data['data'];
    this.showCart();
  }

  showCart(){
    this.cart=this.cartService.getLocalStorage('cart');
    if(this.cart){
      this.cartProducts=this.products.filter(x=>this.cart.some(item=>item.id===x.id))
      this.getCartPrice();
    }
  };

  getProductById(productId: number): IProduct{
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      return product;
    } else {
      throw new Error(`Product with provided ID ${productId} does not exist.`);
    }
  }

  getCartPrice(){
    this.cartTotal=0;
    if(this.cart){
      for(let i=0;i<this.cart.length;i++){
        this.cartTotal+=(this.cart[i].quantity*this.getProductById(this.cart[i].id).price.newPrice);
      }
    }
  }

}
