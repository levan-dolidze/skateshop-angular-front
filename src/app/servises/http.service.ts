import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }


  returnDummyData() {
    const array = [
      {
        id: 1,
        name: 'baker',
        price: 150
      },
      {
        id: 2,
        name: 'element',
        price: 150
      },
      {
        id: 3,
        name: 'baker',
        price: 150
      },
      {
        id: 4,
        name: 'baker',
        price: 150
      },
    ]
  }

}
