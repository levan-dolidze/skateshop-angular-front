import { HttpService } from './../servises/http.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/classes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent implements OnInit {

  constructor(public dialog: MatDialog,
    // private http: HttpClient,
    private router: Router,
    private http:HttpService

  ) { }
  order: Order = new Order();
  orderIsCompleted: boolean = false;



  ngOnInit(): void {
  }

  purchaseNow(form: any) {
    if (form.invalid) {
      return
    }
    // თუ დალოგინებული არ არის უნდა ამოვუნათოთ ლოგინის მოდალი
    // else if(){

    // }
    else {
      let channel =localStorage.getItem('channel');
      if(channel=='now'){
        let fromNow =localStorage.getItem('buy-now');
        this.http.postOrder(fromNow).subscribe((res)=>{})
        // this.http.post('https://skateshop-angular-front-default-rtdb.firebaseio.com/orderProductInfo.json', `${JSON.stringify(fromNow)}`).subscribe(res => {
        // });
        // this.api.deleteItemEvent.next()
        // this.orderIsCompleted = true;
        // setTimeout(() => {
        //   this.dialog.closeAll();
        //   localStorage.removeItem('products')
        //   localStorage.removeItem('items')
        //   this.router.navigate(['/home'])
        // }, 3000);
      }else{
        let fromCart = localStorage.getItem('products');
        this.http.postOrder(fromCart).subscribe((res)=>{})
        // this.http.post('https://skateshop-angular-front-default-rtdb.firebaseio.com/orderProductInfo.json', `${JSON.stringify(fromCart)}`).subscribe(res => {
        // });
        // let fromNow =localStorage.getItem('buy-now');
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





}
