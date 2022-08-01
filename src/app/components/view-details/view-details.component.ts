import { PurchaseModalComponent } from './../../purchase-modal/purchase-modal.component';
import { LoginModalComponent } from './../login-modal/login-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { filter, shareReplay, toArray } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { ItemArray, ProductModel } from './../../models/url';
import { HttpService } from './../../servises/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/servises/auth.service';
import { SharedService } from 'src/app/servises/shared.service';


@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  constructor(private router: ActivatedRoute,
    private http: HttpService,
    private translate: TranslateService,
    public dialog: MatDialog,
    private authService: AuthService,
    private shared: SharedService

  ) { }

  detaledProduct$: Observable<ProductModel[]>;
  product: ProductModel;
  lang: any;
  quantity: number = 0;
  tempArr: Array<any> = [];

  authStatusIsLoggedin: boolean = true;
  authStatus: string = 'login'

  ngOnInit(): void {
    this.shared.languageControl(this.lang, this.translate)
    this.http.changeLanguageEvent.subscribe(() => {
      this.shared.languageControl(this.lang, this.translate)
    })


    const id = this.router.snapshot.paramMap.get('id');
    this.returnProductDetails(id);

  };
  languageControl() {
    this.lang = localStorage.getItem('lang');
    this.lang == 'en' ? this.translate.setDefaultLang('en') : this.translate.setDefaultLang('ka');
  };

  returnProductDetails(key: any) {
    let item = localStorage.getItem('details');
    if (item) {
      let selectedItem = JSON.parse(item);
      this.product=selectedItem
    };
  };

  addProductInCart() {
    let productsInCart = localStorage.getItem('products');
    if (productsInCart) {
      let productInCart = JSON.parse(productsInCart);
      const count = productInCart.filter((obj: any) => obj.id === this.product.id).length + 1;
      this.product.inCart = count
      productInCart.push(this.product);
      localStorage.setItem('products', JSON.stringify(productInCart));

    } else {
      let newProduct = [];
      this.product.inCart = 1
      newProduct.push(this.product)
      localStorage.setItem('products', JSON.stringify(newProduct));
    }
    this.countProductsInCart()
  };


  //აქ უნდა შევამოწმო იუზერი დალოგინებული არის თუ არა რეალურად და მაგი სმიხედვით ან გავუშვა შეკვეთაზე ან ლოგინი მოვთხოვო
  buyProductNow() {
    localStorage.setItem('buy-now', JSON.stringify(this.product));
    localStorage.setItem('channel', 'now')
    this.authStatusIsLoggedin ? this.dialog.open(PurchaseModalComponent) : this.dialog.open(LoginModalComponent);
  };

  // if else ეწერა, და მოკლე if else დავწერე1
  countProductsInCart() {
    let items = localStorage.getItem('items')
    items ? this.quantity = JSON.parse(items) : this.quantity = 0;
    this.quantity++;
    this.http.addItemToCartEvent.next(this.quantity);
  }



  //სავარაუდოდ წასაშლელია
  get loginMode(): string | boolean {
    this.authService.userIsLogedin.subscribe((isLogedIn) => {
      this.authStatusIsLoggedin = isLogedIn;
      //ამის მაგივრად უნდა წამოვიღო ბაზიდან კლიენტის ინფო და ჩავსეტო სახელი 
      this.authStatusIsLoggedin ? this.authStatus = 'levani' : false;
    })
    return this.authStatus
  };



};
