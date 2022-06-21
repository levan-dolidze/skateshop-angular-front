import { PurchaseModalComponent } from './../../purchase-modal/purchase-modal.component';
import { LoginModalComponent } from './../login-modal/login-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { filter, shareReplay } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { ItemArray } from './../../models/url';
import { HttpService } from './../../servises/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/servises/auth.service';


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
    private authService: AuthService

  ) { }

  detaledProduct$: Observable<ItemArray[]>;
  product: ItemArray;
  lang: any;
  quantity: number = 0;
  tempArr: Array<any> = [];

  authStatusIsLoggedin: boolean=true;
  authStatus: string = 'login'

  ngOnInit(): void {
    this.languageControl();
    this.http.changeLanguage.subscribe(() => {
      this.languageControl();
    })


    const id = this.router.snapshot.paramMap.get('id');
    this.returnProductDetails(id);

  };
  languageControl() {
    this.lang = localStorage.getItem('lang');
    this.lang == 'en' ? this.translate.setDefaultLang('en') : this.translate.setDefaultLang('ka');
  };

  returnProductDetails(id: any) {
    this.detaledProduct$ = this.http.returnDummyData();
    this.detaledProduct$.subscribe((res) => {
      shareReplay();
      from(res).pipe(
        filter((x => x.id == id))
      ).subscribe((res) => {
        this.product = res;
      })
    })
  };

  addProductInCart() {
    let productsInCart = localStorage.getItem('products');
    if (productsInCart) {
      let parcedProductsInCart = JSON.parse(productsInCart);
      const count = parcedProductsInCart.filter((obj: any) => obj.id === this.product.id).length + 1;
      this.product.inCart = count
      parcedProductsInCart.push(this.product);
      localStorage.setItem('products', JSON.stringify(parcedProductsInCart));

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
  this.authStatusIsLoggedin?this.dialog.open(PurchaseModalComponent):this.dialog.open(LoginModalComponent);
  };

  // if else ეწერა, და მოკლე if else დავწერე1
  countProductsInCart() {
    let items = localStorage.getItem('items')
    items? this.quantity = JSON.parse(items):this.quantity=0;
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
