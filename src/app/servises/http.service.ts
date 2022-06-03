import { ItemArray } from './../models/url';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private subject = new Subject<any>()

  showNumSub = new Subject<any>();
  changeLanguage:Subject<any>=new Subject();
  addItemToCartEvent:Subject<number>=new Subject();


  sendClickEvent() {
    this.subject.next();
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();

  }




  constructor() { }

  searchSubject: Subject<any> = new Subject();
  filterSubject: Subject<any> = new Subject();




  returnDummyData(): Observable<ItemArray[]> {
    const array = [
      {
        id: 1,
        name: 'baker',
        price: 150,
        type: 'deck',
        image: 'https://images.blue-tomato.com/is/image/bluetomato/304475020_front.jpg-3xZpOt9g08hrsxFM61v8R_mtQ7Y/Lord+Nermal+8+25+Skateboard+Deck.jpg?$b8$'
      },
      {
        id: 2,
        name: 'element',
        price: 150,
        type: 'deck',
        image: 'https://images.blue-tomato.com/is/image/bluetomato/304475020_front.jpg-3xZpOt9g08hrsxFM61v8R_mtQ7Y/Lord+Nermal+8+25+Skateboard+Deck.jpg?$b8$'
      },
      {
        id: 3,
        name: 'spitfire',
        price: 150,
        type: 'wheel',
        image: 'https://images.blue-tomato.com/is/image/bluetomato/304475020_front.jpg-3xZpOt9g08hrsxFM61v8R_mtQ7Y/Lord+Nermal+8+25+Skateboard+Deck.jpg?$b8$'
      },
      {
        id: 4,
        name: 'independent',
        price: 150,
        type: 'truck',
        image: 'https://images.blue-tomato.com/is/image/bluetomato/304475020_front.jpg-3xZpOt9g08hrsxFM61v8R_mtQ7Y/Lord+Nermal+8+25+Skateboard+Deck.jpg?$b8$'
      },
      {
        id: 5,
        name: 'alien complete',
        price: 470,
        type: 'complete',
        image: 'https://images.blue-tomato.com/is/image/bluetomato/304475020_front.jpg-3xZpOt9g08hrsxFM61v8R_mtQ7Y/Lord+Nermal+8+25+Skateboard+Deck.jpg?$b8$'
      },
      {
        id: 6,
        name: 'almost complete',
        price: 500,
        type: 'complete',
        image: 'https://images.blue-tomato.com/is/image/bluetomato/304475020_front.jpg-3xZpOt9g08hrsxFM61v8R_mtQ7Y/Lord+Nermal+8+25+Skateboard+Deck.jpg?$b8$'
      }
  
    ]

    return of(array)

  }

}
