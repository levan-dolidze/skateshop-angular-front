import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/classes';
import { HttpService } from '../servises/http.service';
import { AuthService } from '../servises/auth.service';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent implements OnInit {

  constructor(public dialog: MatDialog,

    ) { }
  order: Order = new Order();
  


  ngOnInit(): void {
  }

  purchaseNow(form: any) {
    if (form.invalid) {
      return
    }
    else{
      //უნდა გავაგზავნო შეკვეთა ბექში POST მეთოდი 
    }
  }


  openDialog() {
    this.dialog.open(PurchaseModalComponent);
  };





}
1