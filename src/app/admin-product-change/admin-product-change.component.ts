import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { ProductModel } from '../models/url';
import { HttpService } from '../servises/http.service';

@Component({
  selector: 'app-admin-product-change',
  templateUrl: './admin-product-change.component.html',
  styleUrls: ['./admin-product-change.component.css']
})
export class AdminProductChangeComponent implements OnInit, OnDestroy {

  constructor(private http: HttpService) { }


  productList$: Observable<ProductModel[]>
  deleteItemEvent$ = new Subscription();
  ngOnInit(): void {
    this.returnProducts();
  }

  returnProducts() {
    this.productList$ = this.http.returnAllProduct();
    this.productList$.subscribe((res) => {
      this.productList$ = of(res)
    })
  };

  deleteItem(key: any) {
    this.http.deleteProduct(key).subscribe((res) => { })
    this.deleteItemEvent$ = this.http.deleteItemEvent.subscribe((item) => {
      this.productList$ = item;
    })


  }

  ngOnDestroy(): void {
    this.deleteItemEvent$.unsubscribe()
  }

}
