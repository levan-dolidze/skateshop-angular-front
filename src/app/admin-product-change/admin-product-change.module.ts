import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProductChangeRoutingModule } from './admin-product-change-routing.module';
import { AdminProductChangeComponent } from './admin-product-change.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AdminProductChangeComponent
  ],
  imports: [
    CommonModule,
    AdminProductChangeRoutingModule,
    MatIconModule

  ]
})
export class AdminProductChangeModule { }
