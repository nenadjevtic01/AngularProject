import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { ShopComponent } from './Components/shop/shop.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { SingleProductComponent } from './Components/single-product/single-product.component';
import { CartComponent } from './Components/cart/cart.component';
import { ContactComponent } from './Components/contact/contact.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent,
    SingleProductComponent,
    CartComponent,
    ContactComponent,
    CheckoutComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
