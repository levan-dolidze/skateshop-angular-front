import { HttpService } from './../servises/http.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, sendEmailVerification } from "firebase/auth";
import { AuthfirebaseService } from '../servises/authfirebase.service';
import { AuthService } from '../servises/auth.service';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';
import { Order, ProductModel, Products } from '../models/url';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private router: Router,
    private http: HttpService,
  ) { }
  order: Order = new Order();
  products: ProductModel = new ProductModel;
  orderIsCompleted: boolean = false;



  ngOnInit(): void {



  }

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


  purchaseNow(form: any) {
    if (form.invalid) {
      return
    }
    if (!this.checkUserLoggedIn()) {
      this.dialog.open(LoginModalComponent);
    }
    else {
      let channel = localStorage.getItem('channel');
      if (channel == 'now') {
        let fromNow = localStorage.getItem('buy-now');
        if (fromNow) {
          let orderedItem = JSON.parse(fromNow);
          this.http.postOrder(this.returnOrder(orderedItem)).subscribe((res) => { })
        };

      } else {
        let fromCart = localStorage.getItem('products');
        if (fromCart) {
          let orderedItem = JSON.parse(fromCart);
          this.http.postOrder(this.returnOrder(orderedItem)).subscribe((res) => { })

        }
      }
      this.http.deleteItemEvent.next();
      this.orderIsCompleted = true;
      setTimeout(() => {
        this.dialog.closeAll();
        localStorage.removeItem('products')
        localStorage.removeItem('items')
        this.router.navigate(['/home'])
      }, 3000);
    }
  };


  openDialog() {
    this.dialog.open(PurchaseModalComponent);
  };


  returnOrder(product:ProductModel) {
    const userInfo:Order = {
      name: this.order.name,
      surname: this.order.surname,
      personalNumber: this.order.personalNumber,
      phoneNumber: this.order.phoneNumber,
      address: this.order.address,
      image: this.order.image,
      product:product

    }
    return userInfo
  };





}
