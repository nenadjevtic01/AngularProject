import {Component, EventEmitter, OnInit} from '@angular/core';
import {CartService} from "../../Services/cart.service";
import {IProduct} from "../../Interfaces/i-product";
import {ActivatedRoute} from "@angular/router";
import {ICart} from "../../Interfaces/i-cart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  products:IProduct[]=[];
  cartProducts:IProduct[]=[];
  cart:ICart[]=[];
  cartTotal:number=0;
  quantityChanged:EventEmitter<void> = new EventEmitter<void>();
  constructor(private cartService:CartService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.products=this.route.snapshot.data['data'];
    this.showCart();

    this.quantityChanged.subscribe(()=>{
      this.showCart();
    })
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

  increaseQuantity(productId:number,size:string){
    let cartItemIndex=this.cart.findIndex(x=>x.id==productId && x.size==size);
    if(cartItemIndex!=-1){
      this.cart[cartItemIndex].quantity++;
      this.cartService.setLocalStorage('cart',this.cart);
      this.quantityChanged.emit();
    }
  }

  decreaseQuantity(productId:number,size:string){
    let cartItemIndex=this.cart.findIndex(x=>x.id==productId && x.size==size);
    if(cartItemIndex!=-1){
      if(this.cart[cartItemIndex].quantity>1){
        this.cart[cartItemIndex].quantity--;
      }else{
        if(this.cart.length==1){
          localStorage.removeItem('cart');
          this.showCart();
        }else{
          this.cart.splice(cartItemIndex,1);
        }
      }
      this.cartService.setLocalStorage('cart',this.cart);
      this.cartService.cartChanged.emit();
      this.quantityChanged.emit();
    }
  }

  removeCartItem(productId:number,size:string){
    let cartItemIndex=this.cart.findIndex(x=>x.id==productId && x.size==size);
    if(cartItemIndex!=-1){
      if(this.cart.length==1){
        localStorage.removeItem('cart');
        this.showCart();
      }else{
        this.cart.splice(cartItemIndex,1);
      }
    }
    this.cartService.setLocalStorage('cart',this.cart);
    this.cartService.cartChanged.emit();
    this.quantityChanged.emit();
  }


}
