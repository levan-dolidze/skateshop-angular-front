import { Component, OnInit } from '@angular/core';
import { ItemArray, Order, ProductModel } from 'src/app/models/url';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { HttpService } from 'src/app/servises/http.service';
import { v4 as uuidv4 } from 'uuid'
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private storage: AngularFireStorage, private http: HttpService) { }
  itemModel: ItemArray;
  orders$: Observable<Order[]>;
  productModel: ProductModel = new ProductModel;
  imgURL: any;
  selectedImage: any
  ngOnInit(): void {
    this.http.getImageDetailList();
    this.returnOrders()

  }

  returnOrders() {
    this.orders$ = this.http.getOrders();
    this.orders$.subscribe((res) => {
      console.log(res)
      this.orders$ = of(res)
      


    })
  }

  

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
            image: this.imgURL
          }
          this.http.insertImageDetails(obj)
        })

      })
    ).subscribe(() => { })
  }



  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgURL = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage = event.target.files[0]
    } else {
      this.imgURL = 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';
    }

  }



  deleteOrder(key:any) {
    this.http.deleteDeleveredOrder(key).subscribe((res)=>{

    })


  }

















}
