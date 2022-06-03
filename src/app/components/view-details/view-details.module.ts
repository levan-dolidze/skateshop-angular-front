import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewDetailsRoutingModule } from './view-details-routing.module';
import { ViewDetailsComponent } from './view-details.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    ViewDetailsComponent
  ],
  imports: [
    CommonModule,
    ViewDetailsRoutingModule,
    MatButtonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
   
    })
  ]
})
export class ViewDetailsModule {}


  export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
  
}
