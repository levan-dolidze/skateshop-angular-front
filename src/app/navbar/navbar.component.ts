

import { HttpService } from './../servises/http.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  search: string;
  lang: any;
  quantity: number = 0

  constructor(private http: HttpService, private translate: TranslateService, public dialog: MatDialog) {
    // translate.setDefaultLang('ka');

  }
  openDialog() {
    this.dialog.open(LoginModalComponent);
  }

  ngOnInit(): void {
    this.languageControl();
    this.http.addItemToCartEvent.subscribe((QTY) => {
      let item = localStorage.getItem('items');
      if (item) {
        this.quantity = JSON.parse(item)
      }
      this.quantity = QTY
      localStorage.setItem('items', JSON.stringify(this.quantity))


    })
    let item = localStorage.getItem('items');
    if (item) {
      this.quantity = JSON.parse(item)
    }



  };

  languageControl() {
    this.lang = localStorage.getItem('lang');
    this.lang == 'en' ? this.translate.setDefaultLang('en') : this.translate.setDefaultLang('ka');
  };

  searchItem(searchInput: any) {
    if (!this.search || searchInput.invalid) {
      return
    } else {
      this.http.searchSubject.next(this.search)
    };

  };

  changeLang(lang: any) {
    localStorage.setItem('lang', lang.value);
    this.translate.use(lang.value);
    this.http.changeLanguage.next();
  }

  clearCart() {
    localStorage.clear();
    this.quantity = 0;
  }

};


