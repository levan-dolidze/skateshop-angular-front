import { Router } from '@angular/router';
import { from } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from './../../servises/http.service';
import { ItemArray } from './../../models/url';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { SharedService } from 'src/app/servises/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { PurchaseModalComponent } from 'src/app/purchase-modal/purchase-modal.component';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  constructor(private http: HttpService,
    private translate: TranslateService,
    private shared:SharedService,
    public dialog: MatDialog

  ) { }
  productCartArray: Array<ItemArray> = [];
  lang: any;


  ngOnInit(): void {
    this.showSkateboardProductFromCart();
    this.clearCart();
    this.shared.languageControl(this.lang,this.translate)
    this.http.changeLanguageEvent.subscribe(() => {
      this.shared.languageControl(this.lang,this.translate)
    })
  };


  checkUserLoggedIn(): boolean {
    let tokenInfo = localStorage.getItem('user');
    if (tokenInfo) {
      let parsedToken = JSON.parse(tokenInfo);
      if (parsedToken.emailVerified) {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  };


  countTotalPrice() {
    let totalPrice = 0;
    from(this.productCartArray).pipe(
      map((x => totalPrice += (x.price * x.inCart)))
    ).subscribe((res) => {
      totalPrice = res;
    })
    return totalPrice
  };

  countTotalItems(): number {
    let totalItems = 0;
    from(this.productCartArray).pipe(
      map((x => totalItems += x.inCart))
    ).subscribe((res) => {
      totalItems = res;
    })
    return totalItems
  };

  deleteItem(index: any) {
    this.productCartArray.splice(index, 1)
    localStorage.setItem('products', JSON.stringify(this.productCartArray));
    localStorage.setItem('items', JSON.stringify(this.countTotalItems()))
    this.http.deleteItemEvent.next();
  };

  checkUserIsLoggedIn() {
    if(!this.checkUserLoggedIn()){
      this.dialog.open(LoginModalComponent);
    }
    else{
      this.dialog.open(PurchaseModalComponent);
    }
    localStorage.setItem('channel','cart')
  };

  clearCart() {
    this.http.clearCartEvent.subscribe(() => {
      this.productCartArray = [];
    })
  };


  showSkateboardProductFromCart() {
    let tempArr=[];
    let products = localStorage.getItem('products');
    if (products) {
      this.productCartArray = JSON.parse(products)
      tempArr =this.productCartArray 
      let uniqueProductsInCart = [
        ...new Map(tempArr.map((item: any) => [item.id, item])).values(),
      ];
      this.productCartArray =  uniqueProductsInCart;
    };

  };


};
