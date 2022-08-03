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


  // returnDummyData(): Observable<ItemArray[]> {
  //   const array = [
  //     {
  //       id: 1,
  //       name: 'baker',
  //       price: 150,
  //       type: 'deck',
  //       image: 'data:image/jpeg;base64,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',
  //       inCart: 0,
  //       key: '4545451'
  //     },
  //     {
  //       id: 2,
  //       name: 'flip',
  //       price: 250,
  //       type: 'deck',
  //       image: 'https://images.blue-tomato.com/is/image/bluetomato/304475020_front.jpg-3xZpOt9g08hrsxFM61v8R_mtQ7Y/Lord+Nermal+8+25+Skateboard+Deck.jpg?$b8$',
  //       inCart: 0,
  //       key: '45454451'

  //     },




  //   ]

  //   return of(array)

  // }

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
