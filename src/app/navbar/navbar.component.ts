import { PurchaseModalComponent } from './../purchase-modal/purchase-modal.component';
import { AuthService } from './../servises/auth.service';
import { HttpService } from './../servises/http.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';
import { SharedService } from '../servises/shared.service';
import { AuthfirebaseService } from '../servises/authfirebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin, AdminPermission } from '../shared/classes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  search: string;
  lang: any;
  quantity: number = 0;
  authStatus: string = 'login'
  authStatusIsLoggedin: boolean;
  userEmail: any
  admin: boolean = false;
  adminPermission:AdminPermission=new AdminPermission();


  constructor(private http: HttpService,
    private translate: TranslateService,
    public dialog: MatDialog,
    private authService: AuthService,
    private shared: SharedService,
    private firebaseAuth: AuthfirebaseService,
    private router: Router,
    private routerAct:ActivatedRoute
    // private cookie:NgcCookieConsentService
  ) {
    // translate.setDefaultLang('ka');

  }


  ngOnInit(): void {

    this.lang = localStorage.getItem('lang');
    this.shared.languageControl(this.lang, this.translate)
    this.addItem();
    this.deleteItem();
    this.clearCartAfterOrdering();
    // this.authService.userIsLogedin.next(true)
    this.loginMode;
    this.checkUserLoggedIn();

  };

  


  checkUserLoggedIn() {
    let tokenInfo = localStorage.getItem('user');
    if (tokenInfo) {
      let parsedToken = JSON.parse(tokenInfo);
      if (parsedToken.emailVerified) {
        this.userEmail = parsedToken.email;
        this.admin=this.adminPermission.adminPermission(this.userEmail)
        this.authService.userIsLogedin.next(true)
        this.authStatusIsLoggedin = true;
      };
    };
  };



  clearCartAfterOrdering() {
    this.http.deleteItemEvent.subscribe((res) => {
      this.quantity = 0;
    })
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
  openDialog() {
    if (this.authStatusIsLoggedin) {
      this.firebaseAuth.logOut();
      this.router.navigate([''])
      window.location.reload();
    }
    else {
      this.dialog.open(LoginModalComponent)

    }
  }
  // checkUserLoggedIn() {
  //   this.http.checkUserIsLoggedInEvent.subscribe((res) => {
  //     //აქ თუ დალოგინებულია უნდა გადავამისამარო შეძენის საბოლოო სტეპზე 
  //     !this.authStatusIsLoggedin ? this.dialog.open(PurchaseModalComponent) : this.openDialog()
  //   })
  // };

  get loginMode(): string | boolean {
    this.authService.userIsLogedin.subscribe((isLogedIn) => {
      this.authStatusIsLoggedin = isLogedIn;

      //ამის მაგივრად უნდა წამოვიღო ბაზიდან კლიენტის ინფო და ჩავსეტო სახელი 
      this.authStatusIsLoggedin ? this.authStatus = this.userEmail : false;
    })
    return this.authStatus
  };




  // searchItem(searchInput: any) {
  //   if (!this.search || searchInput.invalid) {
  //     return
  //   } else {
  //     this.http.searchSubject.next(this.search)
  //   };
  // };
  searchByEnterKey(form: KeyboardEvent) {
    if (form.key === 'Enter') {
      this.http.searchSubject.next(this.search)
    }
    else { return }
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


