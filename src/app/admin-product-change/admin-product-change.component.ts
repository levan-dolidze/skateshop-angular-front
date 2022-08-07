import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, of, Subscription } from 'rxjs';
import { ProductModel } from '../models/url';
import { HttpService } from '../servises/http.service';
import { v4 as uuidv4 } from 'uuid'
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-admin-product-change',
  templateUrl: './admin-product-change.component.html',
  styleUrls: ['./admin-product-change.component.css']
})
export class AdminProductChangeComponent implements OnInit, OnDestroy {

  constructor(private http: HttpService,
    private storage: AngularFireStorage,
    public loader: LoaderService,

  ) { }
  imgURL: any;
  selectedImage: any

  productList$: Observable<ProductModel[]>
  productModel: ProductModel = new ProductModel;

  deleteItemEvent$ = new Subscription();
  ngOnInit(): void {
    this.http.getImageDetailList();
    this.returnProducts();
  }

  returnProducts() {
    this.productList$ = this.http.returnAllProduct();
    this.productList$.subscribe((res) => {
      this.productList$ = of(res)
    })
  };

  deleteProduct(key: any) {
    this.http.deleteProduct(key).subscribe((res) => { })
    this.deleteItemEvent$ = this.http.deleteItemEvent.subscribe((item) => {
      this.productList$ = item;
    })
  };

  //add product

  get returnUniqueExtId() {
    return uuidv4()
  };

  addProduct(form: any) {
    //მოგვაქვს ფაილის სახელი , რომ არ დადუბლირდეს ფაილის სახელი დროს ვუთითებთ
    var filePath = `${this.selectedImage.name}_${new Date().getTime()}`
    const fileRef = this.storage.ref(filePath)
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        //url ში გვაქვს ახალი ატვირთული სურათი
        fileRef.getDownloadURL().subscribe((url) => {
          this.imgURL = url;
          const obj = {
            id: this.returnUniqueExtId,
            type: this.productModel.type,
            name: this.productModel.name,
            price: this.productModel.price,
            image: this.imgURL,
            description: this.productModel.description,
            size: this.productModel.size,
          }
          this.http.insertImageDetails(obj)
        })

      })
    ).subscribe(() => { })
  };



  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgURL = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage = event.target.files[0]
    } else {
      this.imgURL = 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';
    }

  };
















  ngOnDestroy(): void {
    this.deleteItemEvent$.unsubscribe()
  }

}
