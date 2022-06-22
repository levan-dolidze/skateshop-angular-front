import { TranslateService } from '@ngx-translate/core';
import { shareReplay, filter } from 'rxjs/operators';
import { ItemArray, ProductUrl } from './../../../models/url';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpService } from './../../../servises/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent implements OnInit {
  brands: Array<any>
  itemArr$: Observable<ItemArray[]>
  lang: any;  

  constructor(private http: HttpService, public route: Router,
    private translate:TranslateService
    ) { }

  ngOnInit(): void {
    this.returnSkateboardItems();
    this.controlByType();
    this.controlByBrands();
    this.searchSkateboardItems();
    this.languageControl();
    this.http.changeLanguage.subscribe(() => {
      this.languageControl();
    })
  };
  languageControl() {
    this.lang = localStorage.getItem('lang');
    this.lang == 'en' ? this.translate.setDefaultLang('en') : this.translate.setDefaultLang('ka');
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
  returnSkateboardItems() {
    this.itemArr$ = this.http.returnDummyData().pipe(
      shareReplay(),
    )
  };
  controlByBrands() {
    this.http.filterSubject.subscribe((res) => {
      this.brands = res
    })
  };
  controlByType() {
    switch (this.route.url) {
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

}
