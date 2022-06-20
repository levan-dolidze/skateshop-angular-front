import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/classes';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  order:Order =new Order();
  ngOnInit(): void {
  }
  purchaseNow(form:any){

  }
}
