import { TranslateService } from '@ngx-translate/core';
import { HttpService } from './../../servises/http.service';
import { ItemArray } from './../../models/url';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  constructor(private http: HttpService,
    private translate: TranslateService
    ) { }
  productCartArray: Array<ItemArray> = [];
  lang: any;


  ngOnInit(): void {
    this.showSkateboardProductFromCart();
    this.clearCart();
    this.languageControl();
    this.http.changeLanguage.subscribe(()=>{
      this.languageControl(); 
    })

  };
  languageControl() {
    this.lang = localStorage.getItem('lang');
    this.lang == 'en' ? this.translate.setDefaultLang('en') : this.translate.setDefaultLang('ka');
  };

  clearCart() {
    this.http.clearCart.subscribe(() => {
      this.productCartArray = [];
    })
  };


  showSkateboardProductFromCart() {
    let products = localStorage.getItem('products');
    if (products) {
      this.productCartArray = JSON.parse(products)
      let uniqueProductsInCart = [
        ...new Map(this.productCartArray.map((item: any) => [item.id, item])).values(),
      ];
      this.productCartArray = uniqueProductsInCart;
    };
  };


};
