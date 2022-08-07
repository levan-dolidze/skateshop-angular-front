import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProductChangeRoutingModule } from './admin-product-change-routing.module';
import { AdminProductChangeComponent } from './admin-product-change.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AdminProductChangeComponent
  ],
  imports: [
    CommonModule,
    AdminProductChangeRoutingModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule

  ]
})
export class AdminProductChangeModule { }
