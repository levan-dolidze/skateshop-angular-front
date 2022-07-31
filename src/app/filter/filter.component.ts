import { HttpService } from './../servises/http.service';
import { ItemArray, ProductUrl } from './../models/url';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, shareReplay, toArray, map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  currentUrl: any;
  showFilter: boolean;
  itemArr$: Observable<ItemArray[]>
  brands: any = [];
  chousenBrand: string;
  uniqueNames: any

  temp: Array<any> = []

  constructor(public route: Router, private http: HttpService) { }

  ngOnInit(): void {
    this.filterViewByURL();
    this.filterControl();
  };

  filterControl() {
    this.itemArr$ = this.http.returnAllProduct().pipe(
      shareReplay(),
    )
    this.itemArr$.subscribe((res) => {
      if (res) {
        let product = Object.values(res)
        this.arrays = product
      }
    })


    this.route.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.currentUrl = e;
      switch (this.currentUrl.url) {
        case ProductUrl.deck:
          this.itemArr$.subscribe((res) => {
            let product = Object.values(res)
            this.brands = [];
            from(product).pipe(
              filter((x => x.type === ProductUrl.deck.substring(1)))
            ).subscribe((res) => {
              this.brands.push(res);
              this.http.filterSubject.next(this.brands)
            })

          })
          break;
        case ProductUrl.wheel:
          this.itemArr$.subscribe((res) => {
            let product = Object.values(res)
            this.brands = [];
            from(product).pipe(
              filter((x => x.type === ProductUrl.wheel.substring(1)))
            ).subscribe((res) => {
              this.brands.push(res);
              this.http.filterSubject.next(this.brands)
            })
          })
          break;
        case ProductUrl.truck:
          this.itemArr$.subscribe((res) => {
            let product = Object.values(res)
            this.brands = [];
            from(product).pipe(
              filter((x => x.type === ProductUrl.truck.substring(1)))
            ).subscribe((res) => {
              this.brands.push(res)
              this.http.filterSubject.next(this.brands)
            })
          })
          break
        case ProductUrl.complete:
          this.itemArr$.subscribe((res) => {
            let product = Object.values(res)
            this.brands = [];
            from(product).pipe(
              filter((x => x.type === ProductUrl.complete.substring(1))),
              toArray()
            ).subscribe((res) => {
              this.brands = res
              this.http.filterSubject.next(this.brands)
            })
          })
          break;
        default:
          break;
      }
    });
  }

  returnUniqueOwners() {
    let tempo: any[] = []
    let maped = this.brands.map((item: any) => {
      return item.name
    })
    from(maped)
      .pipe(distinctUntilChanged())
      .subscribe((res) => {
        tempo.push(res)
      });
    return tempo

  };







  filterViewByURL() {
    this.route.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.currentUrl = e;
      if (this.currentUrl.url === ProductUrl.deck ||
        this.currentUrl.url === ProductUrl.wheel ||
        this.currentUrl.url === ProductUrl.truck ||
        this.currentUrl.url === ProductUrl.complete
      ) {
        this.showFilter = true;
      }
      else {
        this.showFilter = false;
        this.brands = [];
      }
    });
  };

  tempArray: any = [];
  newArray: Array<ItemArray> = [];
  arrays: Array<ItemArray> = [];
  productArr: Array<ItemArray> = [];

  selectProduct(event: any) {
    switch (event.checked) {
      case true:
        this.tempArray = this.arrays.filter((e: any) => e.name === event.source.value)
        console.log(this.tempArray)
        this.newArray.push(this.tempArray)
        this.productArr = [];
        this.filterProducts(this.newArray)
        break;
      default:
        this.tempArray = this.productArr.filter((e: any) => e.name !== event.source.value);
        this.newArray = [];
        this.productArr = [];
        this.newArray.push(this.tempArray)
        if (this.tempArray.length < 1) {
          this.filterControl();
          this.http.filterSubject.next(this.brands);
          return
        } else {
          this.filterProducts(this.newArray)
        }
        break;
    };


  };

  filterProducts(newArray: any) {
    for (const itemArr of newArray) {
      for (let i = 0; i < itemArr.length; i++) {
        let obj = itemArr[i];
        this.productArr.push(obj);
        this.http.filterSubject.next(this.productArr);
      };
    };
  };






};
