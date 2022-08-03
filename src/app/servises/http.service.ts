import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ItemArray, Order, ProductModel } from './../models/url';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private subject = new Subject<any>()

  //events
  changeLanguageEvent: Subject<any> = new Subject();
  addItemToCartEvent: Subject<number> = new Subject();
  clearCartEvent: Subject<any> = new Subject();
  deleteItemEvent: Subject<any> = new Subject();
  checkUserIsLoggedInEvent: Subject<any> = new Subject();
  cartUrlEvent: Subject<any> = new Subject();

  apiUrl: any = environment.apiUrl;

  IP: any = environment.IP;
  imageDetailList: AngularFireList<any>

  items:Order[]=[]

  sendClickEvent() {
    this.subject.next();
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();

  }




  constructor(private http: HttpClient, private firebase: AngularFireDatabase) { }

  searchSubject: Subject<any> = new Subject();
  filterSubject: Subject<any> = new Subject();

  insertImageDetails(imageDetails: any) {
    this.imageDetailList.push(imageDetails)
  }
  getImageDetailList() {
    this.imageDetailList = this.firebase.list('allProductData')
  };

  returnAllProduct(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.apiUrl}allProductData.json`).pipe(
      //გვიბრუნდება ობიექტი ქიებით,ვითებთ გადავაქცევთ ერეით და ვამატებთ ერეიში ქის სხვა ელემენტებთან ერთად
      map((res) => {
        if (res) {
          const itemArr = [];
          for (const key in res) {
            // res key mtlian obieqts setavs da key:key qmnis axal elements 
            // romelshic keys setavs da setavs mtlian obieqtshi
            itemArr.push({ ...res[key], key: key })
          }
          return itemArr
        } else {
          return []
        }
      })
    )
  };

  postOrder(order: any) {
    return this.http.post(`${this.apiUrl}orders.json`, order)
  };

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}orders.json`).pipe(
      map((res) => {
        if (res) {
          const orderArr = [];
          for (const key in res) {
            orderArr.push({ ...res[key], key: key })
          }
          this.items=orderArr
          return orderArr
        } else {
          return [];
        }
      })
    )
  };
  getDeviceIP() {
    return this.http.get(`${this.IP}`)
  };

  deleteDeleveredOrder(key: any) {
    return this.http.delete(`${this.apiUrl}orders/${key}.json`).pipe(
      tap(()=>{
        const itemIndex=this.items.map((item)=>item.key).indexOf(key);
        this.items.splice(itemIndex,1)
        this.deleteItemEvent.next(of(this.items) )
      })
    )
  };

};
