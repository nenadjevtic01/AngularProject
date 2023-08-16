import { NgModule } from '@angular/core';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./Components/home/home.component";
import {ShopComponent} from "./Components/shop/shop.component";
import {productResolver} from "./Resolver/product.resolver";
import {SingleProductComponent} from "./Components/single-product/single-product.component";
import {brandResolver} from "./Resolver/brand.resolver";
import {categoryResolver} from "./Resolver/category.resolver";
import {genderResolver} from "./Resolver/gender.resolver";
import {CartComponent} from "./Components/cart/cart.component";
import {ContactComponent} from "./Components/contact/contact.component";
import {CustomRouteReuseStrategy} from "./RouteStrategy/custom-route-reuse-strategy";
import {CheckoutComponent} from "./Components/checkout/checkout.component";
import {AboutUsComponent} from "./Components/about-us/about-us.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch:"full"
  },
  {
    path:"home",
    component:HomeComponent,
    resolve:{
      data:productResolver,
      brand:brandResolver
    }
  },
  {
    path:"shop",
    component:ShopComponent,
    resolve:{
      data:productResolver,
      category:categoryResolver,
      brand:brandResolver,
      gender:genderResolver
    }
  },
  {
    path:"cart",
    component:CartComponent,
    resolve:{
      data:productResolver
    }
  },
  {
    path:"checkout",
    component:CheckoutComponent,
    resolve:{
      data:productResolver
    }
  },
  {
    path:"about",
    component:AboutUsComponent
  },
  {
    path:"product/:id",
    component:SingleProductComponent,
    resolve:{
      data:productResolver,
      brand:brandResolver,
      category:categoryResolver,
      gender:genderResolver
    }
  },
  {
    path:"contact",
    component:ContactComponent
  },
  {
    path:"**",
    component:HomeComponent,
    resolve:{
      data:productResolver,
      brand:brandResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild([
      {
        path: 'product/:id',
        component: SingleProductComponent,
        data: {
          reuse: true
        }
      }
    ])
  ],
  providers:[
    {
      provide:RouteReuseStrategy,
      useClass:CustomRouteReuseStrategy
    }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
