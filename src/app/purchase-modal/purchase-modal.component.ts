import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/classes';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private http:HttpClient

    ) { }
  order: Order = new Order();
  


  ngOnInit(): void {
  }

  purchaseNow(form: any) {
    if (form.invalid) {
      return
    }
    // თუ დალოგინებული არ არის უნდა ამოვუნათოთ ლოგინის მოდალი
    // else if(){

    // }
    else{
      let updetedOrderStr =localStorage.getItem('purchase-now-products')
      this.http.post('https://skateshop-angular-front-default-rtdb.firebaseio.com/orderProductInfo.json',`${JSON.stringify(updetedOrderStr)}`).subscribe(responseData => {
      });
    }
  }


  openDialog() {
    this.dialog.open(PurchaseModalComponent);
  };





}
1