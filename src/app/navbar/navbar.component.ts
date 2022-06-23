import { AuthService } from './../servises/auth.service';


import { HttpService } from './../servises/http.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';
import { SharedService } from '../servises/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  search: string;
  lang: any;
  quantity: number = 0;
  userLoginMode: string;
  authStatus: string = 'login'
  authStatusIsLoggedin: boolean;

  constructor(private http: HttpService,
    private translate: TranslateService,
    public dialog: MatDialog,
    private authService: AuthService,
    private shared: SharedService) {
    // translate.setDefaultLang('ka');

  }
  openDialog() {
    this.dialog.open(LoginModalComponent);
  };


  ngOnInit(): void {
    this.shared.languageControl(this.lang,this.translate)
    this.addItem();
    this.deleteItem();
    this.checkUserLoggedIn();
  };


  addItem() {
    this.http.addItemToCartEvent.subscribe((QTY) => {
      let item = localStorage.getItem('items');
      if (item) {
        this.quantity = JSON.parse(item)
      }
      this.quantity = QTY;
      localStorage.setItem('items', JSON.stringify(this.quantity))
    })
    let item = localStorage.getItem('items');
    if (item) {
      this.quantity = JSON.parse(item)
    }
  }

  deleteItem() {
    this.http.deleteItemEvent.subscribe((items) => {
      this.addItem();
    })
  };

  checkUserLoggedIn() {
    this.http.checkUserIsLoggedInEvent.subscribe((res) => {
      //აქ თუ დალოგინებულია უნდა გადავამისამარო შეძენის საბოლოო სტეპზე 
     !this.authStatusIsLoggedin?this.openDialog():false
    })
  };

  get loginMode(): string | boolean {
    this.authService.userIsLogedin.subscribe((isLogedIn) => {
      this.authStatusIsLoggedin = isLogedIn;
      //ამის მაგივრად უნდა წამოვიღო ბაზიდან კლიენტის ინფო და ჩავსეტო სახელი 
      this.authStatusIsLoggedin ? this.authStatus = 'levani' : false;
    })
    return this.authStatus
  };




  searchItem(searchInput: any) {
    if (!this.search || searchInput.invalid) {
      return
    } else {
      this.http.searchSubject.next(this.search)
    };
  };
  searchByEnterKey(form: KeyboardEvent) {
    if (form.key === 'Enter') {
      this.http.searchSubject.next(this.search)
    }
    else{return }
  };


  changeLang(lang: any) {
    localStorage.setItem('lang', lang.value);
    this.translate.use(lang.value);
    this.http.changeLanguageEvent.next();
  };


  clearCart() {
    localStorage.clear();
    this.quantity = 0;
    this.http.clearCartEvent.next();
  };

};


