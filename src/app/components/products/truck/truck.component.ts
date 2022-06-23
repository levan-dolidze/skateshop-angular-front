import { TranslateService } from '@ngx-translate/core';
import { ItemArray, ProductUrl } from './../../../models/url';
import { shareReplay, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from './../../../servises/http.service';
import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SharedService } from 'src/app/servises/shared.service';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent implements OnInit {

  constructor(private http: HttpService, public route: Router,
    private translate:TranslateService,
    private shared:SharedService
    ) { }
  brands: Array<any>
  itemArr$: Observable<ItemArray[]>
  lang: any;  

  ngOnInit(): void {
    this.returnSkateboardItems();
    this.controlByType();
    this.controlByBrands();
    this.searchSkateboardItems();
    this.shared.languageControl(this.lang,this.translate)
    this.http.changeLanguageEvent.subscribe(() => {
      this.shared.languageControl(this.lang,this.translate)
    })
  };

  returnSkateboardItems() {
    this.itemArr$ = this.http.returnDummyData().pipe(
      shareReplay(),
    )
  };
  controlByBrands() {
    this.http.filterSubject.subscribe((res) => {
      this.brands = res;
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

}
