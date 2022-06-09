import { shareReplay, filter } from 'rxjs/operators';
import { HttpService } from './../../servises/http.service';
import { from, Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpService) { }
  itemArr$: Observable<any[]>;


  ngOnInit(): void {
    this.returnSkateboardItems();
    this.searchSkateboardItems();
  };

  returnSkateboardItems() {
    this.itemArr$ = this.http.returnDummyData().pipe(
      shareReplay(),
    )
  };

  searchSkateboardItems() {
    this.http.searchSubject.subscribe((searchValue) => {
      this.returnSkateboardItems();
      this.itemArr$.subscribe((res) => {
        const filtredItem = res.filter((item) => {
          return item.name === searchValue;
        })
        this.itemArr$ = of(filtredItem)
      })

    })
  };


  filterByClientAmount(ev: any) {
    this.itemArr$ = this.http.returnDummyData();
    shareReplay();
      this.itemArr$.subscribe((res) => {
        const filtredItem = res.filter((item) => {
          return item.price <=ev.value;
        })
        this.itemArr$ = of(filtredItem)
      })
  };
  
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }else{
      return value+ '₾';
    }

  }

}
