import { TranslateService } from '@ngx-translate/core';
import { shareReplay, take, toArray } from 'rxjs/operators';
import { HttpService } from './../../servises/http.service';
import { from, Observable, of } from 'rxjs';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpService,
  
  private translate: TranslateService) { }
  itemArr$: Observable<any[]>;
  lang: any;  
  itemCount: number = 5;  
  loadMoreBtn:boolean=true;
  @ViewChildren("itemList") itemList: QueryList<ElementRef>;

  ngOnInit(): void {
    this.returnStartItems(this.itemCount)
    this.searchSkateboardItems();
    this.languageControl();
    this.http.changeLanguage.subscribe(() => {
      this.languageControl();
    })
  };


  loadMore() {
    this.itemCount += 5;
    this.loadMoreItems(this.itemCount);
  };



  ngAfterViewInit() {
    this.itemList.changes.subscribe(() => {
      if (this.itemList && this.itemList.last) {
        this.itemList.last.nativeElement.focus();
      }
    });
  };


  loadMoreItems(num: number) {
    this.http.returnDummyData().subscribe((res) => {
      from(res).pipe(
        take(num),
        toArray()
      ).subscribe((res) => {
        this.itemArr$ = of(res)
      })
    })
  }

  returnStartItems(num:number) {
    this.http.returnDummyData().subscribe((res) => {
      from(res).pipe(
        take(num),
        toArray()
      ).subscribe((res) => {
        this.itemArr$=of(res)
      })
    })
  };



  returnSkateboardItems() {
    this.itemArr$ = this.http.returnDummyData();
    shareReplay();
  }
  languageControl() {
    this.lang = localStorage.getItem('lang');
    this.lang == 'en' ? this.translate.setDefaultLang('en') : this.translate.setDefaultLang('ka');
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

  filterByClientAmount(e: any) {
    this.loadMoreBtn=false;
    this.returnSkateboardItems();
    this.itemArr$.subscribe((res) => {
      const filtredItem = res.filter((item) => {
        return item.price <= e.value;
      })
      this.itemArr$ = of(filtredItem)
    })
  };




  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    } else {
      return value + '₾';
    }
  };
}
