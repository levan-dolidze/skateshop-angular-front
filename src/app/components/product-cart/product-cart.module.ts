import { MatIconModule } from '@angular/material/icon';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCartRoutingModule } from './product-cart-routing.module';
import { ProductCartComponent } from './product-cart.component';
import {MatButtonModule} from '@angular/material/button'


@NgModule({
  declarations: [
    ProductCartComponent
  ],
  imports: [
    CommonModule,
    ProductCartRoutingModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
   
    })
  ]
})
export class ProductCartModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}