import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemArray, Order } from 'src/app/models/url';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpService } from 'src/app/servises/http.service';
import { Observable, of, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  constructor(private http: HttpService,
    public loader: LoaderService,
    
    ) { }
  
  itemModel: ItemArray;
  orders$: Observable<Order[]>;
  deleteItemEvent$ = new Subscription();



  ngOnInit(): void {
    this.http.getImageDetailList();
    this.returnOrders()
  }


  returnOrders() {
    this.orders$ = this.http.getOrders();
    this.orders$.subscribe((res) => {
      this.orders$ = of(res)
    })
  };
  
  deleteOrder(key: any) {
    this.http.deleteDeleveredOrder(key).subscribe((res) => { })
    this.deleteItemEvent$ = this.http.deleteItemEvent.subscribe((item) => {
      this.orders$ = item;
    })
  };

  ngOnDestroy(): void {
    this.deleteItemEvent$.unsubscribe()
  };



  















}
