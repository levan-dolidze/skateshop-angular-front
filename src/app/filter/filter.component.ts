import { HttpService } from './../servises/http.service';
import { ItemArray, ProductUrl, Products } from './../models/url';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, shareReplay } from 'rxjs/operators';
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


  constructor(public route: Router, private http: HttpService) {}

  ngOnInit(): void {
    this.filterViewByURL();
    this.filterControl();
  };


  filterControl() {
    this.itemArr$ = this.http.returnDummyData().pipe(
      shareReplay(),
    )
    this.route.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.currentUrl = e;
      switch (this.currentUrl.url) {
        case ProductUrl.deck:
          this.itemArr$.subscribe((res) => {
            this.brands = [];
            from(res).pipe(
              filter((x => x.type === ProductUrl.deck.substring(1)))
            ).subscribe((res) => {
              this.brands.push(res);
              this.http.filterSubject.next(this.brands)
            })

          })
          break;
        case ProductUrl.wheel:
          this.itemArr$.subscribe((res) => {
            this.brands = [];
            from(res).pipe(
              filter((x => x.type === ProductUrl.wheel.substring(1)))
            ).subscribe((res) => {
              this.brands.push(res);
              this.http.filterSubject.next(this.brands)
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
              this.http.filterSubject.next(this.brands)
            })
          })
          break
          case ProductUrl.complete:
            this.itemArr$.subscribe((res) => {
              this.brands = [];
              from(res).pipe(
                filter((x => x.type === ProductUrl.complete.substring(1)))
              ).subscribe((res) => {
                this.brands.push(res)
                this.http.filterSubject.next(this.brands)
              })
            })
          break;
        default:
          break;
      }
    });
  }

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

  changeTiems(brand: any) {
    if (this.chousenBrand) {
      switch (brand) {
        case Products.baker:
          this.brands = []
          this.itemArr$.subscribe((res) => {
            from(res).pipe(
              filter((x => x.name === Products.baker))
            ).subscribe((res) => {
              this.brands.push(res)
              this.http.filterSubject.next(this.brands)
            })
          })
          break
        case Products.element:
          this.brands = []
          this.itemArr$.subscribe((res) => {
            from(res).pipe(
              filter((x => x.name === Products.element))
            ).subscribe((res) => {
              this.brands.push(res)
              this.http.filterSubject.next(this.brands)
            })
          })
          break
        case Products.spitfire:
          this.brands = []
          this.itemArr$.subscribe((res) => {
            from(res).pipe(
              filter((x => x.name === Products.spitfire))
            ).subscribe((res) => {
              this.brands.push(res)
              this.http.filterSubject.next(this.brands)
            })
          })
          break
        case Products.independent:
          this.brands = []
          this.itemArr$.subscribe((res) => {
            from(res).pipe(
              filter((x => x.name === Products.independent))
            ).subscribe((res) => {
              this.brands.push(res)
              this.http.filterSubject.next(this.brands)
            })
          })
          break
          case Products.alien:
            this.brands = []
            this.itemArr$.subscribe((res) => {
              from(res).pipe(
                filter((x => x.name === Products.alien))
              ).subscribe((res) => {
                this.brands.push(res)
                this.http.filterSubject.next(this.brands)
              })
            })
            break
          case Products.almost:
            this.brands = []
            this.itemArr$.subscribe((res) => {
              from(res).pipe(
                filter((x => x.name === Products.almost))
              ).subscribe((res) => {
                this.brands.push(res)
                this.http.filterSubject.next(this.brands)
              })
            })
            break
        default:
          break;
      }
    } else {
      this.itemArr$.subscribe((res) => {
        this.brands = []
        from(res).pipe(
          filter((x => x.type === this.route.url.substring(1)))
        ).subscribe((res) => {
          this.brands.push(res)
          this.http.filterSubject.next(this.brands)

        })
      })
    }
  };







};
