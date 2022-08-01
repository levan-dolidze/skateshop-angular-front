import { TranslateService } from '@ngx-translate/core';
import { filter, shareReplay, take, toArray } from 'rxjs/operators';
import { HttpService } from './../../servises/http.service';
import { from, Observable, of } from 'rxjs';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SharedService } from 'src/app/servises/shared.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ProductModel } from 'src/app/models/url';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpService,
    private translate: TranslateService,
    private shared: SharedService,
    private deviceService: DeviceDetectorService,
    public loader: LoaderService,
    private router: Router

  ) { }
  itemArr$: Observable<ProductModel[]>;
  lang: any;
  itemCount: number = 5;
  loadMoreBtn: boolean = true;
  @ViewChildren("itemList") itemList: QueryList<ElementRef>;

  ngOnInit(): void {
    // this.http.getDeviceIP().subscribe((res) => {
    // })
    this.returnProducts();
    this.returnStartItems(this.itemCount)
    this.searchSkateboardItems();
    this.languageControl();
  };


  languageControl() {
    this.shared.languageControl(this.lang, this.translate)
    this.http.changeLanguageEvent.subscribe(() => {
      this.shared.languageControl(this.lang, this.translate)
    })
  }

  returnProducts() {
    this.itemArr$ = this.http.returnAllProduct();
  };

  loadMore() {
    this.itemCount += 5;
    this.returnStartItems(this.itemCount);
  };




  returnStartItems(itemQTY: number) {
    this.returnProducts();
    this.itemArr$.subscribe((res) => {
      from(res).pipe(
        take(itemQTY),
        toArray()
      ).subscribe((res) => {
        this.itemArr$ = of(res)
      })
    })
  };



  searchSkateboardItems() {
    this.http.searchSubject.subscribe((searchValue) => {
      this.returnProducts();
      this.itemArr$.subscribe((res) => {
        const filtredItem = res.filter((item) => {
          return item.name === searchValue;
        })
        this.itemArr$ = of(filtredItem)
        this.loadMoreBtn = false;
      })
    })
  };

  filterByClientAmount(e: any) {
    this.loadMoreBtn = false;
    this.returnProducts();
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

  ngAfterViewInit() {
    this.itemList.changes.subscribe(() => {
      if (this.itemList && this.itemList.last) {
        this.itemList.last.nativeElement.focus();
      };
    });
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

