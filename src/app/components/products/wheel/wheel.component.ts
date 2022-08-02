import { TranslateService } from '@ngx-translate/core';
import { shareReplay, filter } from 'rxjs/operators';
import { ItemArray, ProductModel, ProductUrl } from './../../../models/url';
import { from, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpService } from './../../../servises/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from 'src/app/servises/shared.service';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent implements OnInit, OnDestroy {
  brands: Array<any>
  itemArr$: Observable<ProductModel[]>;

  lang: any;
  filterSubject = new Subscription();
  changeLanguageEvent = new Subscription();

  constructor(private http: HttpService, public router: Router,
    private translate: TranslateService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.returnSkateboardItems();
    this.controlByType();
    this.controlByBrands();
    this.searchSkateboardItems();
    this.languageControl();
  };

  languageControl() {
    this.shared.languageControl(this.lang, this.translate)
    this.changeLanguageEvent = this.http.changeLanguageEvent.subscribe(() => {
      this.shared.languageControl(this.lang, this.translate)
    })
  };


  searchSkateboardItems() {
    this.http.searchSubject.subscribe((searchValue) => {
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



  returnSkateboardItems() {
    this.itemArr$ = this.http.returnAllProduct();
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

  ngOnDestroy(): void {
    this.filterSubject.unsubscribe();
    this.changeLanguageEvent.unsubscribe();
  }

}
