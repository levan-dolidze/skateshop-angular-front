import { TranslateService } from '@ngx-translate/core';
import { filter, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from './../../../servises/http.service';
import { from, Observable } from 'rxjs';
import { ItemArray, ProductModel, ProductUrl } from './../../../models/url';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/servises/shared.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

  constructor(private http: HttpService, public router: Router,
    private translate: TranslateService,
    private shared: SharedService
  ) { }
  brands: Array<any>;
  itemArr$: Observable<ProductModel[]>;
  lang: any;

  ngOnInit(): void {
    this.returnSkateboardItems();
    this.controlByType();
    this.controlByBrands();
    this.searchSkateboardItems();
    this.languageControl();
  };

  languageControl() {
    this.shared.languageControl(this.lang, this.translate)
    this.http.changeLanguageEvent.subscribe(() => {
      this.shared.languageControl(this.lang, this.translate)
    })
  }

  searchSkateboardItems() {
    this.http.searchSubject.subscribe((searchValue) => {
      this.itemArr$.subscribe((res) => {
        const filteredItems = res.filter((item) => {
          return item.name === searchValue
        })
        this.brands = filteredItems
      })
    })
  };
  returnSkateboardItems() {
    this.itemArr$ = this.http.returnAllProduct()
  };
  controlByBrands() {
    this.http.filterSubject.subscribe((res) => {
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
};
