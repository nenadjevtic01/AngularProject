import {Component, OnInit} from '@angular/core';
import {INav} from "../../Interfaces/i-nav";
import {NavigationService} from "../../Services/navigation.service";
import {CategoryService} from "../../Services/category.service";
import {ICategory} from "../../Interfaces/i-category";
import {ICart} from "../../Interfaces/i-cart";
import {CartService} from "../../Services/cart.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  navigation:INav[]=[];
  categories:ICategory[]=[];
  cartCount:number=0;
  cart:ICart[]=[];

  constructor(private navigationService: NavigationService, private categoryService : CategoryService,private cartService:CartService) {
  }

  ngOnInit():void{
    let ls:any=localStorage.getItem('cart');
    this.cart=JSON.parse(ls);
    this.updateCartItemCount();
    this.navigationService.getNav().subscribe({
      next:data=>{
        this.navigation=data;
      },
      error:err => {
        console.log(err);
      }
    })

    this.categoryService.getCategory().subscribe({
      next:data=>{
        this.categories=data;
      },
      error:err => {
        console.log(err);
      }
    });

    this.cartService.cartChanged.subscribe(()=>{
      this.updateCartItemCount();
    });

  }

  updateCartItemCount(): void {
    this.cartCount = this.cartService.getCartItemCount();
  }

}
