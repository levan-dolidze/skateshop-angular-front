import { TranslateService } from '@ngx-translate/core';
import { shareReplay, filter } from 'rxjs/operators';
import { ItemArray, ProductModel, ProductUrl } from './../../../models/url';
import { from, Observable, Subscription, } from 'rxjs';
import { HttpService } from './../../../servises/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/servises/shared.service';
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit, OnDestroy {


  constructor(private http: HttpService, public router: Router,
    private translate: TranslateService,
    private shared: SharedService,
    public loader: LoaderService
  ) {
  }
  brands: Array<any> = [];
  itemArr$: Observable<ProductModel[]>
  lang: any;
  changeLanguageEvent = new Subscription();
  searchSubject = new Subscription();
  filterSubject = new Subscription();



  ngOnInit(): void {
    this.returnSkateboardItems();
    this.controlByType();
    this.controlByBrands();
    this.searchSkateboardItems();
    this.shared.languageControl(this.lang, this.translate);
    this.changeLanguageEvent = this.http.changeLanguageEvent.subscribe(() => {
      this.shared.languageControl(this.lang, this.translate)
    })
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

  returnSkateboardItems() {
    this.itemArr$ = this.http.returnAllProduct().pipe(
      shareReplay(),
    )
  };
  controlByBrands() {
    this.filterSubject = this.http.filterSubject.subscribe((res) => {
      this.brands = res
    })
  };
  controlByType() {
    switch (this.router.url) {
      case ProductUrl.deck:
        this.itemArr$.subscribe((res) => {
          if (res) {
            let itemDataAll = Object.values(res);
            this.brands = [];
            from(itemDataAll).pipe(
              filter((x => x.type === ProductUrl.deck.substring(1)))
            ).subscribe((res) => {
              this.brands.push(res)
            })
          }

        })
        break;
      case ProductUrl.wheel:
        this.itemArr$.subscribe((res) => {
          if (res) {
            let itemDataAll = Object.values(res);
            this.brands = [];
            from(itemDataAll).pipe(
              filter((x => x.type === ProductUrl.wheel.substring(1)))
            ).subscribe((res) => {
              this.brands.push(res)
            })
          }
        })
        break;
      case ProductUrl.truck:
        this.itemArr$.subscribe((res) => {
          if (res) {
            let itemDataAll = Object.values(res);
            this.brands = [];
            from(itemDataAll).pipe(
              filter((x => x.type === ProductUrl.truck.substring(1)))
            ).subscribe((res) => {
              this.brands.push(res)
            })
          }
        })
        break;
      case ProductUrl.complete:
        this.itemArr$.subscribe((res) => {
          if (res) {
            let itemDataAll = Object.values(res);
            this.brands = [];
            from(itemDataAll).pipe(
              filter((x => x.type === ProductUrl.complete.substring(1)))
            ).subscribe((res) => {
              this.brands.push(res)
            })
          }
        })
        break;
      default:
        break;
    }
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
    this.changeLanguageEvent.unsubscribe();
    this.searchSubject.unsubscribe();
    this.filterSubject.unsubscribe()
  };
};
