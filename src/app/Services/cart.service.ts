import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICart} from "../Interfaces/i-cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  localCart:ICart[]=[];
  errorMessages:string[]=[];
  cartChanged: EventEmitter<void> = new EventEmitter<void>();
  constructor(private http:HttpClient) { }

  setLocalStorage(name:string,data:any){
    localStorage.setItem(name,JSON.stringify(data));
  }

  getLocalStorage(name:string){
    let cart:any=localStorage.getItem(name);
    return JSON.parse(cart);
  }

  addToCart(product: number, size: string, quantity: number): void {
    this.localCart=this.getLocalStorage('cart');
    if(size!="" && quantity>=1){
      if(this.localCart){
        let alreadyExist=this.localCart.filter(x=>x.id==product && x.size==size);
        if(alreadyExist.length>0){
          let productIndex=this.localCart.findIndex(x=>x.id==product && x.size==size);
          this.localCart[productIndex].quantity=this.localCart[productIndex].quantity+quantity;
          this.setLocalStorage('cart',this.localCart);
          this.cartChanged.emit();
        }else{
          let cartItem:ICart;
          cartItem={
            id:product,
            size:size,
            quantity:quantity
          }
          this.localCart.push(cartItem);
          this.setLocalStorage('cart',this.localCart);
          this.cartChanged.emit();
        }
      }else{
        let cartItem:ICart[] = [];
        cartItem[0]={
          id:product,
          size:size,
          quantity:quantity
        }
        this.setLocalStorage('cart',cartItem);
        this.cartChanged.emit();
      }
    }else{
      if(size==""){
        this.errorMessages.push("Select size.");
      }
      if(quantity<1 || quantity>99){
        this.errorMessages.push("Invalid quantity");
      }
    }
  }

  getCartItemCount(): number {
    let cart:any=localStorage.getItem('cart');
    cart= JSON.parse(cart);
    if(cart==null){
      return 0;
    }else {
      return cart.length;
    }
  }


}
