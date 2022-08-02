import { TranslateService } from '@ngx-translate/core';
import { ItemArray, ProductModel, ProductUrl } from './../../../models/url';
import { shareReplay, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from './../../../servises/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { SharedService } from 'src/app/servises/shared.service';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent implements OnInit, OnDestroy {

  constructor(private http: HttpService, public router: Router,
    private translate: TranslateService,
    private shared: SharedService
  ) { }
  brands: Array<any>
  itemArr$: Observable<ProductModel[]>
  lang: any;
  changeLanguageEvent = new Subscription();
  filterSubject = new Subscription();
  searchSubject = new Subscription();

  ngOnInit(): void {
    this.returnSkateboardItems();
    this.controlByType();
    this.controlByBrands();
    this.searchSkateboardItems();
    this.shared.languageControl(this.lang, this.translate)
    this.changeLanguageEvent = this.http.changeLanguageEvent.subscribe(() => {
      this.shared.languageControl(this.lang, this.translate)
    })
  };

  returnSkateboardItems() {
    this.itemArr$ = this.http.returnAllProduct()
  };
  controlByBrands() {
    this.filterSubject = this.http.filterSubject.subscribe((res) => {
      this.brands = res;
    })
  };
  controlByType() {
    switch (this.router.url) {
      case ProductUrl.deck:
        this.itemArr$.subscribe((res) => {
          this.brands = [];
          from(res).pipe(
            filter((x => x.type === ProductUrl.deck.substring(1)))
          ).subscribe((res) => {
            this.brands.push(res)
          })
        })
        break;
      case ProductUrl.wheel:
        this.itemArr$.subscribe((res) => {
          this.brands = [];
          from(res).pipe(
            filter((x => x.type === ProductUrl.wheel.substring(1)))
          ).subscribe((res) => {
            this.brands.push(res)
          })
        })
        break;
      case ProductUrl.truck:
        this.itemArr$.subscribe((res) => {
          this.brands = [];
          from(res).pipe(
            filter((x => x.type === ProductUrl.truck.substring(1)))
          ).subscribe((res) => {
            this.brands.push(res)
          })
        })
        break;
      case ProductUrl.complete:
        this.itemArr$.subscribe((res) => {
          this.brands = [];
          from(res).pipe(
            filter((x => x.type === ProductUrl.complete.substring(1)))
          ).subscribe((res) => {
            this.brands.push(res)
          })
        })
        break;
      default:
        break;
    }
  };

  searchSkateboardItems() {
    this.searchSubject = this.http.searchSubject.subscribe((searchValue) => {
      this.itemArr$.subscribe((res) => {
        this.brands = [];
        from(res).pipe(
          filter((x => x.name === searchValue))
        ).subscribe((res) => {
          this.brands.push(res)
        })
      })
    })
  };



  viewDetails(key: any) {
    this.itemArr$.subscribe((res) => {
      from(res).pipe(
        filter((x => x.key === key))
      ).subscribe((res) => {
        localStorage.setItem('details', JSON.stringify(res))
        this.router.navigate(['/view-details/', key])
      })
    })
  };

  ngOnDestroy(): void {
    this.filterSubject.unsubscribe();
    this.changeLanguageEvent.unsubscribe();
    this.searchSubject.unsubscribe();
  }

}
