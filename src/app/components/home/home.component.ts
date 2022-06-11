import { TranslateService } from '@ngx-translate/core';
import { shareReplay } from 'rxjs/operators';
import { HttpService } from './../../servises/http.service';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';

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


  ngOnInit(): void {
    this.returnSkateboardItems();
    this.searchSkateboardItems();
    this.languageControl();
    this.http.changeLanguage.subscribe(()=>{
      this.languageControl(); 
    })
  };

  languageControl() {
    this.lang = localStorage.getItem('lang');
    this.lang == 'en' ? this.translate.setDefaultLang('en') : this.translate.setDefaultLang('ka');
  };

  returnSkateboardItems() {
    this.itemArr$ = this.http.returnDummyData().pipe(
      shareReplay(),
    )
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
    this.returnSkateboardItems();
      this.itemArr$.subscribe((res) => {
        const filtredItem = res.filter((item) => {
          return item.price <=e.value;
        })
        this.itemArr$ = of(filtredItem)
      })
  };
  


  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }else{
      return value+ '₾';
    }

  }

}
